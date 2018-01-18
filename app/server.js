require('dotenv').config()
const express = require('express')
const { allowCrossOrigin, loggingService } = require('./utils')
const routes = require('./routes')

/*
 * Initialise App
 */
const app = express()
app.use(loggingService)
app.use(allowCrossOrigin)
app.use(routes)

// this check ensures that app.listen is not called in unit tests
/* istanbul ignore next */
if (!module.parent) {
  const PORT = process.env.PORT || 80
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

// export for testing
module.exports = app
