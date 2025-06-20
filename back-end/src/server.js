import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb'
import path from 'path'

dotenv.config()
const uri = `mongodb+srv://valoraiko:${process.env.DB_PASSWORD}@cluster0.ke0dzuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

async function start() {
  const client = new MongoClient(uri)

  const app = express();
  app.use(express.json())
  app.use('/images', express.static(path.join(__dirname, '../assets')))

  await client.connect()
  const db = client.db('fsv-db')

  const mapProducts = async (ids) => {
    return Promise.all(ids.map(id => db.collection('products').findOne({ id })))
  }

  app.get('/api/products', async (req, res) => {
    const prodcuts = await db.collection('products').find({}).toArray()
    res.json(prodcuts)
  });

  app.get('/api/products/:productId', async (req, res) => {
    const product = await db.collection('products').findOne({ id: req.params.productId })
    res.json(product)
  });

  app.get('/api/users/:userId/cart', async (req, res) => {
    const userId = req.params.userId
    const user = await db.collection('users').findOne({ id: userId })
    res.json(await mapProducts(user.cartItems))
  });

  app.post('/api/users/:userId/cart', async (req, res) => {
    const userId = req.params.userId
    const productId = req.body.id

    await db.collection('users').updateOne({ id: userId }, { $push: { cartItems: productId } })

    const user = await db.collection('users').findOne({ id: userId })
    res.json(await mapProducts(user.cartItems))
  })

  app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
    const userId = req.params.userId
    const productId = req.params.productId

    await db.collection('users').updateOne({ id: userId }, { $pull: { cartItems: productId } })

    const user = await db.collection('users').findOne({ id: userId })
    res.json(await mapProducts(user.cartItems))
  })

  const port = 8000;
  app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
  });
}

start()