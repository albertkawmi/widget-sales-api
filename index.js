const express = require('express')

// TODO move to database.js
const clients = require('./data/clients.json')
const sales = require('./data/sales.json')

// TODO move error message text out of index.js
const githubLink = 'https://github.com/albertkawmi/widget-sales-api'

const app = express()

app.get('/', (req, res) => {
  res.json({
    message: `Welcome to the Widget Sales API. Docs can be found at ${githubLink}`
  })
})

app.get('/sales', (req, res) => {
  res.json(sales)
})

app.get('/clients', (req, res) => {
  res.json(clients)
})

app.get('/fault', (req, res) => {
  res.status(500).json({ error: 'Internal Server Error' })
})

app.get('*', (req, res) => {
  res.status(404).json({
    error: `Path ${req.path} does not exist. Please see ${githubLink} for more information.`
  })
})

// TODO use dotenv to configure the port
const ports = {
  development: 4000,
  test: 4242,
  production: 80
}
const { NODE_ENV } = process.env
const PORT = ports[NODE_ENV]

// this check ensures that app.listen is not called in unit tests
if (!module.parent) {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

// export for testing
module.exports = app
