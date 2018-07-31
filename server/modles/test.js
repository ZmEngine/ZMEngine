const {mysql }= require('../tools/knex')
var create=function(){
  // return mysql.createTable('test', function (table) {
  //   table.increments();
  //   table.string('name');
  //   table.integer('age');
  //   table.timestamps();
  // }).toString()
  var sql={};
  sql.renwu= mysql.createTable('renwu', function (table) {
    table.increments();
    table.string('objectid');
    table.string('title');
    table.string('title');
    table.string('title');
    table.string('title');
    table.timestamps();
  }).toString()
  sql.renwu = mysql.createTable('test', function (table) {
    table.increments();
    table.string('name');
    table.integer('age');
    table.timestamps();
  }).toString()
}

module.exports = { create}