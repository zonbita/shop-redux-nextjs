const authRouter = require('./auth')
const productRouter = require('./product')
const cartRouter = require('./cart')
const invoiceRouter = require('./invoice')
const logEvents = require('../helpers/logEvents')

const createError = require('http-errors')
const { v4: uuid } = require('uuid')

function route(app) {
    app.use('/api/auth', authRouter)
    app.use('/api/product', productRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/invoice', invoiceRouter)

    // Handle Error API
    app.use((req, res, next) => {
        next(createError(404, 'Not Found'))
    })

    app.use((err, req, res, next) => {
        logEvents(`idError---${uuid()}---${req.url}---${req.method}---${err.message}`)
        return res.status(err.status || 500).json({
            status: err.status || 500,
            message: err.message
        })
    })
}

module.exports = route