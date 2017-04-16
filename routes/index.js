var express = require('express');
var router = express.Router();
var Verb = require('../model/model');

var mongoose = require('mongoose');
var https = require('https');
var translate = require('yandex-translate-api')("trnsl.1.1.20170414T013931Z.b5d4a32700d2889c.bcffd691b336f2e0caf4c99ac4279cb1b44c23f1");


/* GET home page. */
router.get('/', function(req, res) {
	console.log('button clicked, get performed');
	var random = Math.floor(Math.random() * 500);
    Verb.findOne().skip(random).exec(function(err, result){
        if(err) throw err;
        //if no error, procceed to get translation
        var verbe = result.verb;
        var trans; //I love naming variables
        translate.translate(verbe,{ from: 'fr', to: 'en'}, function(err, translated) {
            //console.log(translated.text[0])
            trans = translated.text[0]; 
            //console.log(trans); //other coe goes here
            console.log(verbe + " " + trans);
        });
        res.render('index', { title: 'Page d\'acceuil du jeu',verb: verbe, translation: trans });
    });
});

router.post('/api', function(req, res){
	console.log("request posted");
	var random = Math.floor(Math.random() * 500);
    Verb.findOne().skip(random).exec(function(err, res){
        if(err) throw err;
        //if no error, procceed to get translation
        var trans; //I love naming variables
        translate.translate(res.verb,{ from: 'fr', to: 'en'}, function(err, translated) {
            //console.log(translated.text[0])
            trans = translated.text[0]; 
            //console.log(trans); //other coe goes here
            console.log(res.verb + " " + trans);
        });
    });
})

module.exports = router;
