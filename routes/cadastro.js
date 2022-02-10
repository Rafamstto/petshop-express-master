const express = require('express');
const cadastroController = require('../controllers/cadastroController');
const router = express.Router();

router.get('/', cadastroController.index);

module.exports = router;