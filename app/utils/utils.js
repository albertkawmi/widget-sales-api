const { githubLink } = require('../config/constants')

exports.allowCrossOrigin = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
}

exports.loggingService = (req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log([
      Date.now(),
      req.method,
      req.originalUrl,
      req.hostname,
      req.ip
    ].join(' '))
  }
  next()
}

exports.get404message = path =>
  `Path ${path} does not exist. Please see ${githubLink} for more information.`
