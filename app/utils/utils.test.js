/* eslint-env jest */
const { loggingService, get404message } = require('./')

const consoleLog = jest.spyOn(console, 'log')
  .mockImplementation(() => {})

// Mocks
const req = {
  method: 'GET',
  originalUrl: '/clients',
  hostname: 'localhost',
  ip: '1.2.3.4'
}
const res = {}
const next = () => {}

test('loggingService', () => {
  process.env.NODE_ENV = 'test'
  loggingService(req, res, next)
  expect(consoleLog).not.toHaveBeenCalled()

  process.env.NODE_ENV = 'production'
  loggingService(req, res, next)
  expect(consoleLog).toHaveBeenCalledWith(
    expect.stringMatching(/GET \/clients localhost 1\.2\.3\.4/)
  )
})

test('get404message', () => {
  expect(get404message('/not/a/page'))
    .toMatchSnapshot()
})
