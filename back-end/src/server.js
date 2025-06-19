import express from 'express'

const app = express()

app.get('/hello', (req, res) => {
  res.send('Hello world!')
})

const port = 8000
app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})