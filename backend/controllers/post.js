const Post = require('../models/post');
const db = require('../db.js');
const fs = require('fs')

exports.getAllPosts = (req, res, next) => {
  db.query('SELECT post.id, title, content, imageUrl, userId, dateCreate, isAdmin, FROM post INNER JOIN user ON user.id = post.userId ORDER BY dateCreate DESC', (error, result) => {
      if (error) {return res.status(400).json({ error: "Affichage des posts impossible" });}
      return res.status(200).json(result);
  });
}

exports.getOnePost = (req, res, next) => {
  conn.query('SELECT post.id, title, content, imageUrl, userId, dateCreate, isAdmin, FROM post INNER JOIN user ON user.id = post.userId WHERE post.id=? ', req.params.id, (error, result) => {
      if (error) {return res.status(400).json({ error: "Affichage du post impossible" });}
      return res.status(200).json(result);
  });
}

exports.deletePost = (req, res, next) => {
  db.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
      if (error) {
          return res.status(500).json({ error });
      } else {
          if (rows[0].image) {
              const filename = rows[0].image.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                  db.query(`DELETE FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
                      if (error) {return res.status(500).json({ error: "Suppresion impossible" })} 
                      else {return res.status(200).json({ message: "Post supprimé !" })}
                  })
              })}
          else {db.query(`DELETE FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
              if (error) {return res.status(500).json({ error: "Suppresion impossible" })} 
              else {return res.status(200).json({ message: "Post supprimé !" })}
          })}
      }
    }
  )
}

exports.addPost = (req, res, next) => {
  let imageUrl
  if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
      userId: req.body.userId,
      title: title,
      content: content,
      imageUrl: imageUrl
  });
  if (!title && !content && !image) {
      return res.status(400).json({ message: "Une information du post n'est pas renseignée" });
  } else {
      db.query(`INSERT INTO post SET ?`, post, (error, result) => {
          if (error) {return res.status(400).json({ error: error })}
          else {return res.status(201).json({ message: "Post crée!" })}
      })
  }
}

exports.updatePost = (req, res, next) => {
  let imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  db.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
      if (error) {return res.status(500).json({ error });
      } else {
          if (rows[0].image) {
              const filename = rows[0].image.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                  db.query(`UPDATE post SET content = ?, title = ?, image= ?  WHERE id = ?`, [req.body.content, req.body.title, image, req.params.id], (error, result) => {
                      if (error) {return res.status(400).json({ error: "Le post n'a pas pu être modifié" })}
                      else {return res.status(200).json(result)}
                  })
              })
          } else {
              db.query(`UPDATE post SET title = ?, content = ?, WHERE id = ?`, [req.body.title, req.body.content, imageUrl, req.params.id], (error, result) => {
                  if (error) {return res.status(400).json({ error: "Le post n'a pas pu être modifié" })}
                  else {return res.status(200).json(result)}
              })
          }
      }
  })
}