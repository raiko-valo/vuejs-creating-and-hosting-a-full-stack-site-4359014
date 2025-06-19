import express from 'express';
import { products as productsRaw, cartItems as cartItemsRaw } from './temp-data';

const app = express();
app.use(express.json())

let cartItems = cartItemsRaw
let products = productsRaw

app.get('/hello', (req, res) => {
  res.send('Hello world!')
});

app.get('/products', (req, res) => {
  res.json(products)
});

app.get('/products/:productId', (req, res) => {
  const productId = req.params.productId
  const product = productsRaw.find(el => el.id = productId)
  res.json(product)
});

app.get('/cart', (req, res) => {
  res.json(cartItemsRaw)
});

app.post('/cart', (req, res) => {
  const productId = req.body.id
  const product = productsRaw.find(el => el.id = productId)
  cartItems.push(product)
  res.json(cartItems)
})

app.delete('/cart/:productId', (req, res) => {
  const productId = req.params.productId
  cartItems = cartItems.filter(el => el.id !== productId)
  res.json(cartItems)
})

const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
});