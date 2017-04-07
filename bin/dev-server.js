const project = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')

server.listen(project.server_port, () => {
  debug(`\n\n 💻  Server is now running at ${project.server_host}:${project.server_port}.`)
})
