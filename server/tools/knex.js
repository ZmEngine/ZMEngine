const config = require('../config')
var knex = require('knex')({
  client: 'mysql', //指明数据库类型，还可以是mysql，sqlite3等等
  connection: config.mysql,
  debug: true, //指明是否开启debug模式，默认为true表示开启
  pool: { //指明数据库连接池的大小，默认为{min: 2, max: 10}
    min: 0,
    max: 7,
  },
  acquireConnectionTimeout: 10000, //指明连接计时器大小，默认为60000ms
  migrations: {
    tableName: 'migrations' //数据库迁移，可选
  }
});

module.exports = { mysql:knex.schema }