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
        res.render('collection/index', { result: result, priceSum: priceSum, currentUser: req.user });
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


// browse other user's
router.get('/browse', isLoggedIn, function(req, res) {
    db.user.findAll().then(function(result) {
        res.render('collection/browse', { result: result, userCollection: false });
    }).catch(function(error) {
        res.send("Error - Cant find Other Users")
    });
});
// get specific user's collection
router.post('/browse', function(req, res) {
    db.collection.findAll({
        where: { userId: req.body.selectpicker }
    }).then(function(result) {
        console.log(result)
    })
})

//Call the api, get the price, change the collections database to have the new price
router.put('/:id', function(req, res) {
    var scryApi = "https://api.scryfall.com/cards/multiverse/";
    var dbId = req.params.id;
    var multiId = req.body.multiverseId
    var userId = String(req.user.id);
    console.log("the params.id are " + userId)
    request(scryApi + multiId, function(error, response, body) {
        if (error) {
            return res.send(error);
        }
        var data = JSON.parse(body)
        var updatePrice = data.usd
        console.log(updatePrice)
        db.collection.update({ price: updatePrice }, { where: { id: dbId } }).then(function() {
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
                res.render('collection/index', { result: result, priceSum: priceSum, currentUser: req.user });
            }).catch(function(error) {
                res.send('There is some kind of error!');
            });
        })
    })
});

module.exports = router;