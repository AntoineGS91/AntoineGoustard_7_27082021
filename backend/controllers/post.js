//Import model post
const Post = require('../models/post');
//Import base de données
const db = require('../db.js');

//Récupération de tous les commentaires
exports.getAllPosts = (req, res, next) => {
  db.query('SELECT posts.id, posts.content, posts.title, posts.dateCreate, userId, username FROM posts LEFT JOIN users ON users.id = posts.userId ORDER BY dateCreate DESC', (error, result) => {
    if (error) throw error;
    else { return res.status(200).json(result)}
  })
}

//Récupération d'un post
exports.getOnePost = (req, res, next) => {
  db.query('SELECT post.id, title, content, userId, dateCreate, isAdmin, FROM posts INNER JOIN users ON users.id = posts.userId WHERE post.id=? ', req.params.id, (error, result) => {
      if (error) {return res.status(400).json({ error: "Affichage du post impossible" });}
      return res.status(200).json(result);
  });
}

//Suppression d'un post
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

//Création d'un post
exports.addPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;
  const post = new Post({
      userId: req.body.userId,
      title: title,
      content: content,
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

//Modification d'un post
exports.updatePost = (req, res, next) => {
  db.query(`SELECT * FROM posts WHERE id=?`, req.params.id, (error, rows, fields) => {
      if (error) {return res.status(500).json({ error });
      } else {
            db.query(`UPDATE posts SET title = ?, content = ?, WHERE id = ?`, [req.body.title, req.body.content, req.params.id], (error, result) => {
                if (error) {return res.status(400).json({ error: "Le post n'a pas pu être modifié" })}
                else {return res.status(200).json(result)}
              })
          }
      })
}
  
