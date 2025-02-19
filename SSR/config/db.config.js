module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "1234",
  DB: "db_coffeshop_ssr",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}