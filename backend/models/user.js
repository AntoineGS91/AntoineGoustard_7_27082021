const mysql = require('mysql2')

const User = function (user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.imageUrl = user.imageUrl;
    this.isAdmin = user.isAdmin;
}

module.exports = User
