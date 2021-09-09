// Import MySql
const mysql = require('mysql2');

// Connection à la base de données
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'groupomania'
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données Groupomania !");
});

module.exports = db