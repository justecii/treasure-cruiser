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
        console.log(priceSum);
        res.render('collection/index', { result: result });
    }).catch(function(error) {
        res.send('There is some kind of error!');
    });

});
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

module.exports = router;