const config = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:server')
const corsProxy = require('cors-anywhere')

if (config.env === 'development') {
  corsProxy.createServer({
    // originWhitelist: [], // Allow all origins
    // requireHeader: [],
    // setHeaders: { },
    // removeHeaders: []
  }).listen(config.cors_proxy_port, config.server_host, () => {
    debug(`\n\n ⚠️ CORS proxy running on ${config.server_host}:${config.cors_proxy_port}`)
  })
}

server.listen(config.server_port, () => {
  debug(`\n\n 💻  Server is now running at ${config.server_host}:${config.server_port}.`)
})
