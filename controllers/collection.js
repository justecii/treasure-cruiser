var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get("/", isLoggedIn, function(req, res) {
    var userId = String(req.user.id);
    console.log(userId);
    db.collection.findAll({
        where: { userId: userId },
    }).then(function(result) {

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
        res.send(req.body)
            // user.createCollection({
            //         cardName: req.body.name,
            //         img: req.body.img,
            //         bigImg: req.body.bigImg,
            //         set: req.body.set,
            //         mutliverseId: req.body.id,
            //         rarity: req.body.rarity,
            //     })
            //     .then(function(collection) {
            //         console.log("added to db");
            //         res.send('/');
            //     })
    })
});

module.exports = router;