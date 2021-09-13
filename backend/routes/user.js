const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user.js")

const multer = require('../middleware/multer-config.js')
const auth = require('../middleware/auth.js');

router.post('/signup', multer, userCtrl.signup)
router.post('/login', userCtrl.login)
router.delete('/users/:id', auth, userCtrl.deleteUser)
router.put('/users/:id', auth, userCtrl.modifyUser)
router.get('/users/:id', auth, userCtrl.getOneUser)

module.exports = router;