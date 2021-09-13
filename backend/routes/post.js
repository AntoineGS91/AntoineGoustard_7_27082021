const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');


router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/', auth, postCtrl.addPost);
router.put('/:id', auth, postCtrl.updatePost);

module.exports = router;