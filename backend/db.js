//Import MySql
const mysql = require('mysql2');
//Import DotEnv (variables d'environnement)
require('dotenv').config()

//Gestion des informations de connection de la base de données
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DTBS
});

// Connection à la base de données
db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données Groupomania !");
});

module.exports = db