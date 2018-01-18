// TODO use an actual database
const clients = require('./clients.json')
const sales = require('./sales.json')

module.exports = {
  getClients: () => clients,
  getSales: () => sales
}
