require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const boolParser = require('express-query-boolean')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const db = require('./db/mongo-db')
const { Limits } = require('./config/limits')
const HttpCodes = require('./helpers/http-codes')
const Ports = require('./helpers/ports')
const authRouter = require('./router/auth-routes')
const currentRouter = require('./router/user-routes')
const categoriesRoutes = require('./router/categories-routes')
const statisticsRoutes = require('./router/statistics-routes')
const transactionsRoutes = require('./router/transactions-routes')

const PORT = process.env.PORT || Ports.DEFAULT

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: Limits.JSON }))
app.use(boolParser())
app.use(cookieParser())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/auth', authRouter)
app.use('/users', currentRouter)
app.use('/categories', categoriesRoutes)
app.use('/statistics', statisticsRoutes)
app.use('/transactions', transactionsRoutes)

app.use((req, res) => {
  res.status(HttpCodes.NOT_FOUND).json({
    status: 'error',
    code: HttpCodes.NOT_FOUND,
    message: 'Not Found.',
  })
})

app.use((err, req, res, next) => {
  const statusCode = err.status || HttpCodes.INTERNAL_SERVER_ERROR

  res.status(statusCode).json({
    status: statusCode === HttpCodes.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
    code: statusCode,
    message: err.message,
  })
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

const startServer = async () => {
  try {
    await db
    app.listen(PORT, () => console.log('Server running on port: ', PORT))
  } catch (error) {
    console.log('Error in startServer: ', error.message)
  }
}

startServer()

module.exports = app
