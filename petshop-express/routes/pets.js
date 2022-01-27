var express = require('express');
var router = express.Router();
var PetsController = require("../controllers/petsController");


/* GET home page. */
router.get('/', PetsController.index);

module.exports = router;