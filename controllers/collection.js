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
        var priceArray = [];
        for (var i = 0; i < result.length; i++) {
            var makeNum = parseFloat(result[i].price);
            if (makeNum > 0) {
                priceArray.push(makeNum);
            }
        }
        var priceSum = (priceArray.reduce(function(a, b) {
            return a + b;
        }, 0)).toFixed(2);
        res.render('collection/index', { result: result, priceSum: priceSum });
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
                multiverseId: req.body.multiverseId,
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

//Call the api, get the price, change the collections database to have the new price
router.put('/:id', function(req, res) {
    var scryApi = "https://api.scryfall.com/cards/multiverse/";
    var dbId = req.params.id;
    db.collection.findById(dbId).then(function(foundCard) {
        q = foundCard.multiverseId;
        request(scryApi + q, function(error, response, body) {
            if (error) {
                return res.send(error);
            }
            var data = JSON.parse(body);
            var results = data.usd
        })
    }).then(function(results) {
        db.collection.update({ price: results }, { where: { id: dbId } });
    }).then(function() {
        res.redirect('/')
    });
});

module.exports = router;