//Import model comment
const Comment = require('../models/comment');
//Import base de données
const db = require('../db.js');

//Création de commentaire
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

//Suppression commentaire
exports.deleteComment = (req, res, next) => {
    let commentId = req.params.id;
    db.query(`DELETE FROM comment WHERE id = ?`, commentId, (error, result) => {
        if (error) return res.status(400).json({ error: "Impossible de supprimer le commentaire !" })
        else {return res.status(200).json(result)}
    })
}

//Récupération de tous les commentaires
exports.getAllComments = (req, res, next) => {
    const params = new Array()
    params.push(parseInt(req.params.id))
    db.query(`SELECT * FROM comments WHERE postId = ? ORDER BY dateCreate DESC`, 
            params, (error, result) => {
        if (error) return res.status(400).json({ error })
        else {return res.status(200).json(result)}
    })
}

//Récupération d'un seul commentaire
exports.getOneComment = (req, res, next) => {
    db.query('SELECT comments.id, comments.content, userId, isAdmin FROM comments INNER JOIN users ON users.id = comments.userId WHERE comments.id=? ', req.params.id, (error, result) => {
        if (error) {return res.status(400).json({ error: "Impossible d'afficher le commentaire" })}
        else {return res.status(200).json(result)}
    })
}