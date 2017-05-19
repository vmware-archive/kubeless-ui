const config = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:server')

server.listen(config.server_port, () => {
  const address = config.env === 'production'
  ? `on port ${config.server_port}`
  : `at ${config.server_host}:${config.server_port}`
  debug(`\n\n 💻  Server is now running ${address}`)
})
