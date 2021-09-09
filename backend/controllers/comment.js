const Comment = require('../models/comment');
const db = require('../db.js');

exports.addComment = (req, res, next) => {
    const content = req.body.content;
    const comment = new Comment({
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content,
    });
    if (!content) {return res.status(400).json({ message: "Impossible de publié un commentaire vide !" })} 
    else {
        db.query(`INSERT INTO comment SET ?`, comment, (error, result) => {
            if (error) {res.status(400).json({ error: error })} 
            else {res.status(200).json({ result })}
        })
    }
}

exports.deleteComment = (req, res, next) => {
    let commentId = req.params.id;
    db.query(`DELETE FROM comment WHERE id = ?`, commentId, (error, result) => {
        if (error) return res.status(400).json({ error: "Impossible de supprimer le commentaire !" })
        else {return res.status(200).json(result)}
    })
}

exports.getAllComments = (req, res, next) => {
    db.query(`SELECT comment.id, comment.content, comment.dateCreate, comment.userId, 
            comment.postId, user.username FROM comment INNER JOIN post ON post.id = comment.postId 
            left join user on user.id = comment.userId WHERE post.id= ? ORDER BY dateCreate DESC`, 
            req.params.id, (error, result) => {
        if (error) return res.status(400).json({ error: "Impossible d'afficher les commentaires !" })
        else {return res.status(200).json(result)}
    })
}

exports.getOneComment = (req, res, next) => {
    db.query('SELECT comment.id, comment.content, userId, isAdmin FROM comment INNER JOIN user ON user.id = comment.userId WHERE comment.id=? ', req.params.id, (error, result) => {
        if (error) {return res.status(400).json({ error: "Impossible d'afficher le commentaire" })}
        else {return res.status(200).json(result)}
    })
}