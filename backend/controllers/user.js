//Import base de données
const db = require('../db.js');
//Import model User 
const User = require("../models/User");
//Import JWT (token)
const jwt =  require('jsonwebtoken')
//Import Bcrypt
const bcrypt = require('bcrypt');

//Création compte user
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          username: req.body.username,
          isAdmin: 0,
          password: hash
        });
        db.query('INSERT INTO users SET ?', user, (error, result, field) => {
            if (error) {
                console.error(error);
                return res.status(400).json({ error })
            }
            return res.status(201).json({ message: 'Utilisateur créé !' })
        })
      .catch(error => res.status(500).json({ error }));
    })
}

//Création enregistrement user
exports.login = (req, res, next) => {
    const email = req.body.email
    db.query("SELECT * FROM users WHERE email= '" + req.body.email + "'", req.body.email, (error, result, fields) => {
        if (error) throw error
        else {
            if (result.length > 0){
                bcrypt.compare(req.body.password, result[0].password)
                .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Informations de connexion incorrectes !' });
                }
                else {
                    res.status(200).json({
                    id: result[0].id,
                    username: result[0].username,
                    isAdmin: result[0].isAdmin,
                    token: jwt.sign({ userId: result[0].id },'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' })
                })}})
                .catch(error => res.status(500).json({ error }));
            }
            else {res.status(401).json({ error: "l'utilisateur n'existe pas !" });}
        }})
}

//Suppression user
exports.deleteUser = (req, res, next) => {
    let userId = req.params.id;
    db.query(`DELETE FROM users WHERE id = `+ userId, userId, (error, result) => {
        if (error) return res.status(400).json({ error: "Vous ne pouvez pas supprimer cet utilisateur" });
        else{ res.status(200).json({ message: "L'utilisateur a bien été supprimé" })}
    })
}

//Récupération un seul user
exports.getOneUser = (req, res, next) => {
    db.query('SELECT * FROM users WHERE id =?', req.params.id, (error, result) => {
        if (err) throw err;
        else {
            return res.status(200).json(result);
        }
    })
}

//Modification user
exports.modifyUser = (req, res, next) => {
    const email = req.body.email;
    const id = req.params.id;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ message: "les champs des formulaires ne doivent pas être vide" });
    } else {
        bcrypt.hash(password, 10)
            .then((hash) => {
                password = hash;
                db.query(
                    `UPDATE users SET email='${email}', password='${password}', WHERE id=` + id, id, (error, results, fields) => {
                        if (error) {
                            return res.status(400).json(error);
                        }
                        return res.status(200).json({ message: 'Vos information ont bien été modifié !' });
                    }

                );

            })
            .catch(error => res.status(500).json({ error }));
    }
}