const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const target = `http://${HOST}:${PORT}`

module.exports = [
  {
    context: ['/api'],
    target,
    secure: false,
    changeOrigin: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    },
    hostRewrite: true,
    autoRewrite: true,
    protocolRewrite: 'https',
    cookieDomainRewrite: {
      '*': ''
    },
  },
  {
    context: ['/graphql', '/ws'],
    target: 'http://localhost:3000',
    secure: false,
    ws: true,
    changeOrigin: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    },
    hostRewrite: true,
    autoRewrite: true,
    protocolRewrite: 'https',
    cookieDomainRewrite: {
      '*': ''
    },
  },
]
