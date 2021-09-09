const mysql = require('mysql2');

const Post = function(post) {
    this.id = post.postId;
    this.content = post.content;
    this.title = post.title;
    this.imageUrl = post.imageUrl;
    this.userId = post.userId;
}

module.exports = Post