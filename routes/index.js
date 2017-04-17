var express = require('express');
var router = express.Router();
var Verb = require('../model/model');

var mongoose = require('mongoose');
var https = require('https');
var translate = require('yandex-translate-api')("trnsl.1.1.20170414T013931Z.b5d4a32700d2889c.bcffd691b336f2e0caf4c99ac4279cb1b44c23f1");


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'la page d\'acceuil du jeu'});
});


module.exports = router;
