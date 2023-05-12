const express = require('express');
const { userController } = require('../controller');
const { validaToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', validaToken, userController.findAll);
router.post('/', userController.insert);
module.exports = router;