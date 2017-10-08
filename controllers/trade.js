var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get("/", isLoggedIn, function(req, res) {
    var userId = String(req.user.id);
    db.trade.findAll({
        where: { userId: userId },
    }).then(function(result) {
        // Calculate sum of collection
        var priceArray = [];
        for (var i = 0; i < result.length; i++) {
            var makeNum = parseFloat(result[i].price);
            if (makeNum > 0) {
                priceArray.push(makeNum);
            }
        }
        console.log(priceArray);
        var priceSum = (priceArray.reduce(function(a, b) {
            return a + b;
        }, 0)).toFixed(2);
        console.log(priceSum)
        res.render('trade/index', { result: result, priceSum: priceSum });
    }).catch(function(error) {
        res.send('There is some kind of error!');
    });

});

//add a card to trade
router.post("/", isLoggedIn, function(req, res) {
    db.user.findOne({
        where: {
            id: req.user.id
        }
    }).then(function(user) {
        user.createTrade({
                cardName: req.body.name,
                price: req.body.price
            })
            .then(function(collection) {
                console.log("added to db");
            })
    })
});

module.exports = router;