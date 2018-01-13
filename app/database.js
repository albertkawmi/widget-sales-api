// TODO use an actual database
const clients = require('../data/clients.json')
const sales = require('../data/sales.json')

module.exports = {
  getClients: () => clients,
  getSales: () => sales
}
