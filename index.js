const express = require('express')
const http = require('http');
require('dotenv').config();

const app = express()

app.get('/', (request, response) => {
  response.end('hello world!')
})
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

