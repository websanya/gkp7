const http = require('http')
const GKP7API = require('./GKP7/config/app')
const GKP7Server = http.Server(GKP7API)
const GKP7PORT = process.env.PORT || 3001
const LOCAL = '0.0.0.0'

GKP7Server.listen(GKP7PORT, LOCAL, () => console.log(`GKP7 API running on ${GKP7PORT}`))
