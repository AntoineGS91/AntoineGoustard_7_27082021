const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const commentCtrl = require('../controllers/comment')

router.get('/:id', auth, commentCtrl.getAllComments)
router.post('/', auth, commentCtrl.addComment)
router.delete('/:id', auth,  commentCtrl.deleteComment)

module.exports = router