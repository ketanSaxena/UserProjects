var express = require('express');
var mongoose = require('mongoose');
var Users = require('../models/Users.js');

var router = express.Router();

/* GET /users listing. */
router.get('/users', function(req, res, next) {
  Users.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /users */
router.post('/users', function(req, res, next) {
  Users.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /users/:id */
router.get('user/:id', function(req, res, next) {
  Users.findById(req.params.id, 'profile projects', function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /users/:id/projects */
router.get('user/:id/projects', function(req, res, next) {
  Users.find({ '_id': req.params.id })
    .select({projects: 1})
    .exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

module.exports = router;