//Import package express
const express = require('express')
//Création du routeur
const router = express.Router()
//Import Middleware d'authentification (sécurisation)
const auth = require('../middleware/auth')
//Import Controller
const commentCtrl = require('../controllers/comment')

//Route Récupération de tous les commentaires
router.get('/:id', auth, commentCtrl.getAllComments)
//Route Ajout de commentaire
router.post('/', auth, commentCtrl.addComment)
//Route Suppression de commentaire
router.delete('/:id', auth,  commentCtrl.deleteComment)

module.exports = router