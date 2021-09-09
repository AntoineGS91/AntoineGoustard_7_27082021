const mysql = require('mysql2')

const Comment = function (comment) {
    this.id = comment.id
    this.content = comment.content
    this.postId = comment.postId
    this.userId = comment.userId
}

module.exports = Comment