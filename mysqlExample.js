var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'fintech' // 데이터베이스(스키마) 이름
});
 
connection.connect();

connection.query('SELECT * FROM fintech.user', function (error, results, fields) {
  if (error) throw error;
  console.log('User list is: ', results);
});

connection.end();