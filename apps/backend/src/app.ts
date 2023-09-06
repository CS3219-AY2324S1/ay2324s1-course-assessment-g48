import express from "express";

const app = express();

// Dictates default port and URI
const config = require('./utils/config')

const middleware = require('./utils/middleware')

const logger = require('./utils/logger')

const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error: any) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
    
module.exports = app

