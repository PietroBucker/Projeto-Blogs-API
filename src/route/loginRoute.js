const express = require('express');
const { tokenCreat, validaLogin } = require('../middleware/validateLogin');

const router = express.Router();

router.post('/', validaLogin, tokenCreat);

module.exports = router;