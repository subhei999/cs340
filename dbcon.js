var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_shaars',
  password        : '5269',
  database        : 'cs340_shaars'
});

module.exports.pool = pool;
