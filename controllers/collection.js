var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get("/", isLoggedIn, function(req, res) {
    res.render('collection/index')
    console.log(req.user.id)
});
router.post("/", isLoggedIn, function(req, res) {
    db.user.findOne({
        where: {
            id: req.user.id
        }
    }).then(function(user) {
        // user.createCollection({
        //     cardId: req.body.name
        // }).then(function(collection) {

        // })
        // db.collection.create({
        //     cardId: data.id,
        // }).then(function() {
        //     console.log("added to db")
        // })
        console.log(req.body.name)
        res.send('/');

    })
});

module.exports = router;