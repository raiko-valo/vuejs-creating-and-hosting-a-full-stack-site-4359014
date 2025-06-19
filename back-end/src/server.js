import express from 'express';
import { products as productsRaw, cartItems as cartItemsRaw } from './temp-data';

const app = express();
app.use(express.json())

let cartItems = cartItemsRaw
let products = productsRaw

const mapProducts = (ids) => {
  return products.filter(el => ids.includes(el.id))
}

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
  res.json(mapProducts(cartItems))
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