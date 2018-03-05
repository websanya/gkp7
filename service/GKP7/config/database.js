module.exports = (mongoose, config) => {
  const database = mongoose.connection
  mongoose.Promise = Promise
  mongoose.connect(config.database, {
    promiseLibrary: global.Promise
  })
  database.on('error', error => console.log(`Connection to GKP7 database failed: ${error}`))
  database.on('connected', () => console.log('Connected to GKP7 database'))
  database.on('disconnected', () => console.log('Disconnected from GKP7 database'))
  process.on('SIGINT', () => {
    database.close(() => {
      console.log('GKP7 database terminated, connection closed')
      process.exit(0)
    })
  })
}
