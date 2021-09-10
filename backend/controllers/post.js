const Post = require('../models/post');
const db = require('../db.js');

exports.getAllPosts = (req, res, next) => {
  db.query('SELECT post.id, title, content, userId, dateCreate, isAdmin, FROM posts INNER JOIN users ON users.id = posts.userId ORDER BY dateCreate DESC', (error, result) => {
      if (error) {return res.status(400).json({ error: "Affichage des posts impossible" });}
      else { 
          if(result.length > 0) {
            const Posts = [];
            for (let i = 0; i < result.length; i++) {
            Posts.push({
              userId: result[i].userId,
              title: result[i].title,
              content: result[i].content,
              id: result[i].id,
              dateCreate: result[i].dateCreate
            })
            }
            res.status(200).json(Posts);
          }
          else {res.status(200).json([]);}
      }
  })
}
  
exports.getOnePost = (req, res, next) => {
  db.query('SELECT post.id, title, content, userId, dateCreate, isAdmin, FROM posts INNER JOIN user ON user.id = post.userId WHERE post.id=? ', req.params.id, (error, result) => {
      if (error) {return res.status(400).json({ error: "Affichage du post impossible" });}
      return res.status(200).json(result);
  });
}

exports.deletePost = (req, res, next) => {
  db.query(`SELECT * FROM posts WHERE id=?`, req.params.id, (error, rows, fields) => {
      if (error) {
          return res.status(500).json({ error });
      } else {
           {db.query(`DELETE FROM posts WHERE id=?`, req.params.id, (error, rows, fields) => {
              if (error) {return res.status(500).json({ error: "Suppresion impossible" })} 
              else {return res.status(200).json({ message: "Post supprimé !" })}
          })}
      }
    }
  )
}

exports.addPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
      userId: req.body.userId,
      title: title,
      content: content
  })
  if (!title || !content) {
      return res.status(400).json({ message: "Une information du post n'est pas renseignée" });
  } else {
      db.query(`INSERT INTO posts SET ?`, post, (error, result) => {
          if (error) {return res.status(400).json({ error: error })}
          else {return res.status(201).json({ message: "Post crée!" })}
      })
  }
}

exports.updatePost = (req, res, next) => {
  db.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
      if (error) {return res.status(500).json({ error });
      } else {
            db.query(`UPDATE post SET title = ?, content = ?, WHERE id = ?`, [req.body.title, req.body.content, req.params.id], (error, result) => {
                if (error) {return res.status(400).json({ error: "Le post n'a pas pu être modifié" })}
                else {return res.status(200).json(result)}
              })
          }
      })
}
  
