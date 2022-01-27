var express = require('express');
var router = express.Router();
var ServicosController = require("../controllers/servicosController");


/* GET home page. */
router.get('/', ServicosController.index);

module.exports = router;