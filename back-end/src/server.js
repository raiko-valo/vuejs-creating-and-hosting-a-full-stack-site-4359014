import express from 'express';
import dotenv from 'dotenv';

const { MongoClient } = require('mongodb');

dotenv.config()
const uri = `mongodb+srv://valoraiko:${process.env.DB_PASSWORD}@cluster0.ke0dzuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri)

const app = express();
app.use(express.json())

const mapProducts = async (ids) => {
  await client.connect()
  const db = client.db('fsv-db')
  console.log(ids)
  return Promise.all(ids.map(id => db.collection('products').findOne({ id })))
}

app.get('/products', async (req, res) => {
  await client.connect()
  const db = client.db('fsv-db')
  const prodcuts = await db.collection('products').find({}).toArray()
  res.json(prodcuts)
});

app.get('/products/:productId', async (req, res) => {
  await client.connect()
  const db = client.db('fsv-db')
  const product = await db.collection('products').findOne({ id: req.params.productId })
  res.json(product)
});

app.get('/users/:userId/cart', async (req, res) => {
  await client.connect()
  const db = client.db('fsv-db')
  const user = await db.collection('users').findOne({ id: req.params.userId })
  res.json(await mapProducts(user.cartItems))
});

app.post('/cart', (req, res) => {
  const productId = req.body.id
  cartItems.push(productId)
  res.json(mapProducts(cartItems))
})

app.delete('/cart/:productId', (req, res) => {
  const productId = req.params.productId
  cartItems = cartItems.filter(el => el !== productId)
  res.json(mapProducts(cartItems))
})

const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
});