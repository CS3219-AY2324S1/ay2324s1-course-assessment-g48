const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

// Port uses 8000 as set in .env
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})