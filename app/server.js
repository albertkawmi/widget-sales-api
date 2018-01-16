require('dotenv').config()
const express = require('express')
const db = require('./database')
const { allowCrossOrigin } = require('./utils')
const { githubLink } = require('./constants')

const app = express()

app.use(allowCrossOrigin)

app.get('/', (req, res) => {
  res.json({
    message: `Welcome to the Widget Sales API. Docs can be found at ${githubLink}`
  })
})

app.get('/sales', (req, res) => {
  res.json(db.getSales())
})

app.get('/clients', (req, res) => {
  res.json(db.getClients())
})

app.get('/fault', (req, res) => {
  res.status(500).json({ error: 'Internal Server Error' })
})

app.get('*', (req, res) => {
  res.status(404).json({
    error: `Path ${req.path} does not exist. Please see ${githubLink} for more information.`
  })
})

// this check ensures that app.listen is not called in unit tests
/* istanbul ignore next */
if (!module.parent) {
  const PORT = process.env.PORT || 80
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

// export for testing
module.exports = app
