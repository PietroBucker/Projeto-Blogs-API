const express = require('express');
const { userController } = require('../controller');
const { validaToken } = require('../middleware/auth');

const router = express.Router();
router.get('/:id', validaToken, userController.findById);
router.get('/', validaToken, userController.findAll);
router.post('/', userController.insert);
router.delete('/me', validaToken, userController.userDelete);
module.exports = router;