var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');
var request = require('request');

router.get("/", function(req, res) {
    res.render('search/index')
});

router.post("/results", function(req, res) {
    var scryApi = "https://api.scryfall.com/cards/search?q=";
    var q = req.body.name;
    request(scryApi + q, function(error, response, body) {
        if (error) {
            return res.send(error);
        }
        var data = JSON.parse(body);
        res.send(data);
    });
});

module.exports = router;