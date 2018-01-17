/* eslint-env jest */
const supertest = require('supertest')
const app = require('./server.js')
const testApp = supertest(app)

test('/', () => {
  return testApp.get('/')
    .expect('Content-Type', /application\/json/)
    .expect(200, {
      message: 'Welcome to the Widget Sales API. GET /clients or /sales to see some data. Docs can be found at https://github.com/albertkawmi/widget-sales-api'
    })
})

test('/sales', () => {
  return testApp.get('/sales')
    .expect('Content-Type', /application\/json/)
    .expect(200)
    .then(({ body: results }) => {
      expect(results.length).toBe(100)
      results.forEach(testSaleObject)
    })

  function testSaleObject(sale) {
    expect(typeof sale.id).toBe('number')
    expect(typeof sale.clientId).toBe('number')
    expect(typeof sale.productName).toBe('string')
    expect(sale.size).toMatch(/small|medium|large/)
  }
})

test('/clients', () => {
  return testApp.get('/clients')
    .expect('Content-Type', /application\/json/)
    .expect(200)
    .then(({ body: results }) => {
      expect(results.length).toBe(10)
      results.forEach(testClientObject)
    })

  function testClientObject(client) {
    const telephoneRegex = /\+\d{1,3}\s\d{3}\s\d{3}\s\d{4}/

    expect(typeof client.id).toBe('number')
    expect(typeof client.firstName).toBe('string')
    expect(typeof client.lastName).toBe('string')
    expect(typeof client.company).toBe('string')
    expect(typeof client.country).toBe('string')
    expect(client.telephone).toMatch(telephoneRegex)
  }
})

test('/fault', () => {
  return testApp.get('/fault')
    .expect(500, { error: 'Internal Server Error'})
})

test('404', () => {
  return testApp.get('/oops/not/here')
    .expect(404, {
      error: 'Path /oops/not/here does not exist. Please see https://github.com/albertkawmi/widget-sales-api for more information.'
    })
})
