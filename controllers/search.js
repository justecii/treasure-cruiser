var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/ppConfig');
var request = require('request');

router.get("/", function(req, res) {
    var scryApi = "https://api.scryfall.com/cards/search?q=tarmogoyf";
    request(scryApi, function(error, response, body) {
        if (error) {
            return res.send(error)
        }
        var result = JSON.parse(body).results;
        console.log(result);
    });
    // var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';
    // request(pokemonUrl, function(error, response, body) {
    //     if (error) {
    //         return res.send(error);
    //     }

    //     var result = JSON.parse(body).results;
    //     console.log(result);
    //     // res.render('index', { pokemon: result });
    // });
});

module.exports = router;