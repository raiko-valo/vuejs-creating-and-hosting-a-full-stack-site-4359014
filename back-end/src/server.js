import express from 'express';
import { products, cartItems } from './temp-data';

const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello world!')
});

app.get('/products', (req, res) => {
  res.json(products)
});

app.get('/products/:productId', (req, res) => {
  const productId = req.params.productId
  const product = products.find(el => el.id = productId)
  res.json(product)
});

app.get('/cart', (req, res) => {
  res.json(cartItems)
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
});