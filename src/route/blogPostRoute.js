const express = require('express');
const { blogPostController } = require('../controller');
const { validaToken } = require('../middleware/auth');

const router = express.Router();
router.get('/search?', validaToken, blogPostController.findAll);
router.get('/:id', validaToken, blogPostController.findById);
router.get('/', validaToken, blogPostController.findAll);
router.post('/', validaToken, blogPostController.insert);
router.put('/:id', validaToken, blogPostController.update);
router.delete('/:id', validaToken, blogPostController.postDelete);
module.exports = router;