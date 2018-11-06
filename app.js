const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const { snacksRoutes, reviewsRoutes } = require('./routes')
const processErrorMessage = require('./middleware/errors')
require('dotenv').config()

app.use(cors())
app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/api/snacks', snacksRoutes)
app.use('/api/snacks/:id/reviews', reviewsRoutes) 

app.use((req, res) => {
  const status = 404
  const message = `Could not ${req.method} ${req.path}`
  res.status(status).json({ status, message })
})

app.use((err, req, res, next) => {
  err = processErrorMessage(err)
  if (process.env.NODE_ENV !== 'test') console.error(err)
  const { status, message } = err
  res.status(status).json({ status, message })
})

app.listen(port, () => console.log(`On port: ${port}`))


module.exports = app