var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get("/", isLoggedIn, function(req, res) {
    // db.user.findOne({
    //     where: {
    //         id: req.user.id
    //     }
    // }).then(function(user) {
    //     user.getCollections().then(function(collections) {
    //         console.log(collections);
    // res.render('collection/index')
    // console.log(req.user.id);
    //     })
    // })
    db.collection.findAll().then(function(result) {
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
            cardId: req.body.name
        }).then(function(collection) {
            console.log("added to db");
            res.send('/');
        })
    })
});

module.exports = router;