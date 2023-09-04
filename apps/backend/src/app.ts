import express from "express";

const app = express();

// Dictates default port and URI
const config = require('./utils/config')

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

module.exports = app

