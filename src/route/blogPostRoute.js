const express = require('express');
const { blogPostController } = require('../controller');
const { validaToken } = require('../middleware/auth');

const router = express.Router();
router.get('/', validaToken, blogPostController.findAll);
router.post('/', validaToken, blogPostController.insert);

module.exports = router;