var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get("/", isLoggedIn, function(req, res) {
    var userId = String(req.user.id);
    db.collection.findAll({
        where: { userId: userId },
    }).then(function(result) {
        //Calculate sum of collection
        var priceSum = [];
        for (var i = 0; i < result.length; i++) {
            var makeNum = parseFloat(result[i].price);
            if (makeNum > 0) {
                priceSum.push(makeNum);
            }
        }
        // console.log(priceSum);
        res.render('collection/index', { result: result });
    }).catch(function(error) {
        res.send('There is some kind of error!');
    });

});
//add a card to collection
router.post("/", isLoggedIn, function(req, res) {
    db.user.findOne({
        where: {
            id: req.user.id
        }
    }).then(function(user) {
        user.createCollection({
                cardName: req.body.name,
                img: req.body.img,
                bigImg: req.body.bigImg,
                setName: req.body.setName,
                mutliverseId: req.body.id,
                rarity: req.body.rarity,
                price: req.body.price

            })
            .then(function(collection) {
                console.log("added to db");
            })
    })
});
//remove card from collection
router.delete('/:id', isLoggedIn, function(req, res) {
    var removeMe = req.params.id
    console.log(removeMe + "BBBBBBBBBBBBBBBBBBB")
    db.collection.destroy({
        where: {
            id: removeMe,
        }
    }).then(function() {
        res.render('/')
    }).catch(function(error) {
        res.send('There is some kind of error!');
    });
});

router.put('/', function(req, res) {
    //Call the api, get the price, change the collections database to have the new price
    var scryApi = "https://api.scryfall.com/cards/multiverse/";
    var q = req.body.multiverseId;
    request(scryApi + q, function(error, response, body) {
        if (error) {
            return res.send(error);
        }
        var data = JSON.parse(body);
        var results = data.data
    }).then(function(results) {
        db.collection.update({
            price: results.usd
        }, {
            where: {
                multiverseId: results.multiverse_id //apimultiverseId
            }
        })
    }).then(function() {
        res.render('/collection')
    });
});

module.exports = router;