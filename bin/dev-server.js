const project = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')
const corsProxy = require('cors-anywhere')

corsProxy.createServer({
  // originWhitelist: [], // Allow all origins
  // requireHeader: [],
  // setHeaders: { },
  // removeHeaders: []
}).listen(project.cors_proxy_port, project.server_host, () => {
  debug(`\n\n ⚠️ CORS proxy running on ${project.server_host}:${project.cors_proxy_port}`)
})

server.listen(project.server_port, () => {
  debug(`\n\n 💻  Server is now running at ${project.server_host}:${project.server_port}.`)
})
