exports.allowCrossOrigin = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
}

exports.loggingService = (req, res, next) => {
  console.log([
    Date.now(),
    req.method,
    req.originalUrl,
    req.hostname,
    req.ip
  ].join(' '))
  next()
}