// Imports.

var bcrypt = require('bcrypt');
var jwtUtils    = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;


// Routes.
module.exports = {
    register: function(req, res){

        // Params.
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var score = 0;
        var img = '/';

        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if (username.length >= 13 || username.length <= 4) {
            return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and 1 number at)' });
        }





        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound){
            if (!userFound) {

                bcrypt.hash(password, 5, function(err, bcryptedPassword){
                    var newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        score: score,
                        img: img
                    })
                    .then(function(newUser){
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'error': 'cannot add user'});
                    });
                });

            }else {
                return res.status(409).json({ 'error': 'user already exist'});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'unable to verify user' });
        });

    },
    login: function(req, res){

        // Params.
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        // TODO verify mail regex + pwd.
        models.User.findOne({
            where: { email: email }
        })
        .then(function(userFound){
            if (userFound) {

                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                    if (resBycrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    }else {
                        return res.status(403).json({ 'error': 'invalid password' });
                    }
                })

            }else {
                return res.status(404).json({ 'error': 'user not exist in DB' });
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'unable to verify user' });
        });
    },
    getUserProfile: function(req, res){
        // Getting auth header.
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) {
            return res.status(400).json({ 'error': 'wrong token' });
        }

        models.User.findOne({
            attributes: ['id', 'email', 'username', 'score', 'img'],
            where: {id: userId}
        }).then(function(user){
            if (user) {
                res.status(201).json(user);
            }else {
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function(err){
            res.status(500).json({ 'error': 'cannot fetch user' });
        });
    }
}
