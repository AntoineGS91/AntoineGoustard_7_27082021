//Import package express
const express = require("express");
//Création du routeur
const router = express.Router();
//Import Controller
const userCtrl = require("../controllers/user.js")
//Import Middleware d'import des fichiers image
const multer = require('../middleware/multer-config.js')
//Import Middleware d'authentification (sécurisation)
const auth = require('../middleware/auth.js');

//Route Création de compte
router.post('/signup', multer, userCtrl.signup)
//Route Enregistrement de compte
router.post('/login', userCtrl.login)
//Route Suppression de compte
router.delete('/users/:id', auth, userCtrl.deleteUser)
//Route Modification de compte
router.put('/users/:id', auth, userCtrl.modifyUser)
//Route Récupération d'un utilisateur
router.get('/users/:id', auth, userCtrl.getOneUser)

module.exports = router;