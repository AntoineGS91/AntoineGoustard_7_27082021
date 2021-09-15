//Import package express
const express = require('express');
//Création du routeur
const router = express.Router()
//Import Middleware d'authentification (sécurisation)
const auth = require('../middleware/auth');
//Import Controller
const postCtrl = require('../controllers/post');

//Route Récupération de tous les posts
router.get('/', auth, postCtrl.getAllPosts);
//Route Récupération d'un post
router.get('/:id', auth, postCtrl.getOnePost);
//Route Suppression de post
router.delete('/:id', postCtrl.deletePost);
//Route Ajout de post
router.post('/', auth, postCtrl.addPost);
//Route Modification de pot
router.put('/:id', auth, postCtrl.updatePost);

module.exports = router;