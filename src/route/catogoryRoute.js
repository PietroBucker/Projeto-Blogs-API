const express = require('express');
const { categoryController } = require('../controller');
const { validaToken } = require('../middleware/auth');

const router = express.Router();
router.get('/', validaToken, categoryController.findAll);
router.post('/', validaToken, categoryController.insert);

module.exports = router;