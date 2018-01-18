const routes = require('express').Router()
const db = require('../db')
const { homeRouteMessage, dummyError } = require('../config/constants')
const { get404message } = require('../utils')

routes.get('/', (req, res) => {
  res.json({ message: homeRouteMessage })
})

routes.get('/sales', (req, res) => {
  res.json(db.getSales())
})

routes.get('/clients', (req, res) => {
  res.json(db.getClients())
})

routes.get('/fault', (req, res) => {
  res.status(500).json({ error: dummyError })
})

routes.get('*', (req, res) => {
  res.status(404).json({
    error: get404message(req.path)
  })
})

module.exports = routes
