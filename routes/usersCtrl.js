// Imports.

var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var path = require('path');
var asyncLib = require('async');
var Cookies = require('cookies');
var cookies;
var flag = false;

var tok;

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
        var img = req.body.img;

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

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['email'],
                    where: { email: email }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
            },
            function(userFound, done) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                        done(null, userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({ 'error': 'user already exist' });
                }
            },
            function(userFound, bcryptedPassword, done) {
                var newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    score: 0,
                    img: img
                })
                .then(function(newUser) {
                    done(newUser);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'cannot add user' });
                });
            }
        ], function(newUser) {
            if (newUser) {
                // return res.status(201).json({
                //     'userId': newUser.id
                // });

                return res.status(201).redirect('/login');

            } else {
                return res.status(500).json({ 'error': 'cannot add user' });
            }
        });
    },
    login: function(req, res){

        // Params.
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    where: { email: email }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
            },
            function(userFound, done) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({ 'error': 'user not exist in DB' });
                }
            },
            function(userFound, resBycrypt, done) {
                if(resBycrypt) {
                    done(userFound);
                } else {
                    return res.status(403).json({ 'error': 'invalid password' });
                }
            }
        ], function(userFound) {
            if (userFound) {
                tok = jwtUtils.generateTokenForUser(userFound)

                cookies = new Cookies(req, res)


                // Set the cookie to a value
                cookies.set('Authorization', 'Bearer '+tok, { secure: false})

                cookies.set('clientAuth', true, { secure: false, httpOnly: false})

                flag = true;

                res.redirect('/jeu/salon');
            } else {
                return res.status(500).json({ 'error': 'cannot log on user' });
            }
        });
    },
    getUserProfile: function(req, res) {

        cookies = new Cookies(req, res)

        if (flag === true) {
            var userId = jwtUtils.getUserId('Bearer '+tok);

            flag = false;
            tok = null;
        }else {
            var headerAuth  = cookies.get('Authorization');
            var userId      = jwtUtils.getUserId(headerAuth);
        }

        // Getting auth header

        if (userId < 0){
            // res.redirect("/login");
            res.status(400).json({ 'error': 'wrong token, please try to log in again' });
        }

        models.User.findOne({
            attributes: [ 'id', 'email', 'username', 'score', 'img' ],
            where: { id: userId }
        }).then(function(user) {
            if (user) {
                // res.sendFile(path.join(__dirname + '/public/salon.html'));
                return res.json(user);
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function(err) {
            res.json({ 'error': 'cannot fetch user' });
        });
    },
    updateUserProfile: function(req, res) {
        // Getting auth header
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        // Params
        var username = req.body.username;

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['id', 'username'],
                    where: { id: userId }
                }).then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
            },
            function(userFound, done) {
                if(userFound) {
                    userFound.update({
                        username: (username ? username : userFound.username)
                    }).then(function() {
                        done(userFound);
                    }).catch(function(err) {
                        res.status(500).json({ 'error': 'cannot update user' });
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], function(userFound) {
            if (userFound) {
                return res.status(201).json(userFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update user profile' });
            }
        });
    },
    disconnect: function(req, res) {
        cookies = new Cookies(req, res);
        cookies.set('Authorization', '', { secure: false });

        var flag = false;
        var tok = null;

        cookies.set('clientAuth', false, { secure: false, httpOnly: false})
        cookies.set('myId', '', { secure: false, httpOnly: false})
        cookies.set('Pseudo', '', { secure: false, httpOnly: false})
        
        res.json('Disconnected successfully');
    },

    score: function (winner) {

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['id', 'score'],
                    where: { id: winner.id }
                }).then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    console.log('(500): unable to verify user');
                });
            },
            function(userFound, done) {
                if(userFound) {
                    console.log(userFound);
                    userFound.update({
                        score: userFound.score+1
                    }).then(function() {
                        done(userFound);
                    }).catch(function(err) {
                        console.log('(500): impossible to increase the winner\'s score');
                    });
                } else {
                    console.log('(404): user not found');
                }
            },
        ], function(userFound) {
            if (userFound) {
                console.log('(201): Winner score++ 😍');
            } else {
                console.log('(500): cannot update user profile');
            }
        });
    }
}
