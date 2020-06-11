// Imports.

var bcrypt = require('bcryptjs');
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

        cookies = new Cookies(req, res);
        // Params.
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var score = 0;
        var img = req.body.img;

        if (email == null || username == null || password == null) {
            cookies.set('resErrorMsg', 'emptyInput', { secure: false, httpOnly: false});
            return res.status(400).redirect(req.get('referer'));
        }

        if (username.length >= 13 || username.length <= 4) {
            cookies.set('resErrorMsg', 'username', { secure: false, httpOnly: false});
            return res.status(400).redirect(req.get('referer'));
        }

        if (!EMAIL_REGEX.test(email)) {
            cookies.set('resErrorMsg', 'email', { secure: false, httpOnly: false});
            return res.status(400).redirect(req.get('referer'));
        }

        if (!PASSWORD_REGEX.test(password)) {
            // return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and 1 number at)' });
            cookies.set('resErrorMsg', 'psw', { secure: false, httpOnly: false});
            return res.status(400).redirect(req.get('referer'));
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
                    cookies.set('resErrorMsg', 'verifyError', { secure: false, httpOnly: false});
                    return res.status(400).redirect(req.get('referer'));
                });
            },
            function(userFound, done) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                        done(null, userFound, bcryptedPassword);
                    });
                } else {
                    cookies.set('resErrorMsg', 'alreadyExist', { secure: false, httpOnly: false});
                    return res.status(400).redirect(req.get('referer'));
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
                    cookies.set('resErrorMsg', 'internalError', { secure: false, httpOnly: false});
                    return res.status(500).redirect(req.get('referer'));
                });
            }
        ], function(newUser) {
            if (newUser) {
                return res.status(201).redirect('/login');

            } else {
                cookies.set('resErrorMsg', 'internalError', { secure: false, httpOnly: false});
                return res.status(500).redirect(req.get('referer'));
            }
        });
    },
    login: function(req, res){

        cookies = new Cookies(req, res);

        // Params.
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            cookies.set('resErrorMsg', 'emptyInput', { secure: false, httpOnly: false});
            return res.status(400).redirect(req.get('referer'));
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
                    cookies.set('resErrorMsg', 'verifyError', { secure: false, httpOnly: false});
                    return res.status(500).redirect(req.get('referer'));
                });
            },
            function(userFound, done) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    cookies.set('resErrorMsg', 'notExist', { secure: false, httpOnly: false});
                    return res.status(404).redirect(req.get('referer'));
                }
            },
            function(userFound, resBycrypt, done) {
                if(resBycrypt) {
                    done(userFound);
                } else {
                    cookies.set('resErrorMsg', 'invalidPsw', { secure: false, httpOnly: false});
                    return res.status(403).redirect(req.get('referer'));
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
                cookies.set('resErrorMsg', 'connectionError', { secure: false, httpOnly: false});
                return res.status(500).redirect(req.get('referer'));
            }
        });
    },
    getUserProfile: function(req, res) {

        cookies = new Cookies(req, res);

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
            cookies.set('resErrorMsg', 'tokenError', { secure: false, httpOnly: false});
            return res.status(400).redirect(req.get('referer'));
        }

        models.User.findOne({
            attributes: [ 'id', 'email', 'username', 'score', 'img' ],
            where: { id: userId }
        }).then(function(user) {
            if (user) {
                return res.json(user);
            } else {
                cookies.set('resErrorMsg', 'verifyError', { secure: false, httpOnly: false});
                return res.status(400).redirect(req.get('referer'));
            }
        }).catch(function(err) {
            cookies.set('resErrorMsg', 'verifyError', { secure: false, httpOnly: false});
            return res.status(400).redirect(req.get('referer'));
        });
    },
    updateUserProfile: function(req, res) {

        cookies = new Cookies(req, res);

        // Getting auth header
        if (flag === true) {
            var userId = jwtUtils.getUserId('Bearer '+tok);

            flag = false;
            tok = null;
        }else {
            var headerAuth  = cookies.get('Authorization');
            var userId      = jwtUtils.getUserId(headerAuth);
        }

        // Params
        var username = req.body.username;
        var img = req.body.img;

        if (username.length >= 13 || username.length <= 4) {
            cookies.set('resErrorMsg', 'username', { secure: false, httpOnly: false});
            return res.status(400).redirect(req.get('referer'));
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['id', 'username', 'img'],
                    where: { id: userId }
                }).then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    cookies.set('resErrorMsg', 'verifyError', { secure: false, httpOnly: false});
                    return res.status(500).redirect(req.get('referer'));
                });
            },
            function(userFound, done) {
                if(userFound) {
                    userFound.update({
                        username: (username ? username : userFound.username),
                        img: (img ? img : userFound.img)
                    }).then(function() {
                        done(userFound);
                    }).catch(function(err) {
                        cookies.set('resErrorMsg', 'updateError', { secure: false, httpOnly: false});
                        return res.status(500).redirect(req.get('referer'));
                    });
                } else {
                    cookies.set('resErrorMsg', 'userNotFound', { secure: false, httpOnly: false});
                    return res.status(404).redirect(req.get('referer'));
                }
            },
        ], function(userFound) {
            if (userFound) {
                return res.status(201).redirect("/jeu/profil");
            } else {
                cookies.set('resErrorMsg', 'updateError', { secure: false, httpOnly: false});
                return res.status(500).redirect(req.get('referer'));
            }
        });
    },
    updateUserPsw: function(req, res) {

        cookies = new Cookies(req, res);

        // Getting auth header
        if (flag === true) {
            var userId = jwtUtils.getUserId('Bearer '+tok);

            flag = false;
            tok = null;
        }else {
            var headerAuth  = cookies.get('Authorization');
            var userId      = jwtUtils.getUserId(headerAuth);
        }

        // Params
        var newPsw = req.body.password;

        if (!PASSWORD_REGEX.test(newPsw)) {
            cookies.set('resErrorMsg', 'psw', { secure: false, httpOnly: false});
            return res.status(400).redirect(req.get('referer'));
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    where: { id: userId }
                }).then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    cookies.set('resErrorMsg', 'verifyError', { secure: false, httpOnly: false});
                    return res.status(500).redirect(req.get('referer'));
                });
            },
            function(userFound, done) {
                if (userFound) {
                    bcrypt.hash(newPsw, 5, function( err, bcryptedPassword ) {
                        userFound.update({
                            password: bcryptedPassword
                        }).then(function() {
                            done(userFound);
                        }).catch(function(err) {
                            cookies.set('resErrorMsg', 'updateError', { secure: false, httpOnly: false});
                            return res.status(500).redirect(req.get('referer'));
                        });
                    });
                } else {
                    cookies.set('resErrorMsg', 'alreadyExist', { secure: false, httpOnly: false});
                    return res.status(409).redirect(req.get('referer'));
                }
            },
        ], function(userFound) {
            if (userFound) {
                return res.status(201).redirect("/jeu/profil");
            } else {
                cookies.set('resErrorMsg', 'updateError', { secure: false, httpOnly: false});
                return res.status(500).redirect(req.get('referer'));
            }
        });
    },
    deleteUserProfile: function(req, res) {

        cookies = new Cookies(req, res);

        console.log('DELETE PROFILE');

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
            cookies.set('resErrorMsg', 'tokenError', { secure: false, httpOnly: false});
            return res.status(400).redirect(req.get('referer'));
        }

        models.User.destroy({
            where: { id: userId }
        }).then(function(user) {
            cookies.set('clientAuth', false, { secure: false, httpOnly: false})
            cookies.set('myId', '', { secure: false, httpOnly: false})
            cookies.set('Pseudo', '', { secure: false, httpOnly: false})
            return res.status(400).redirect(req.get('referer'));
        }).catch(function(err) {
            return module.exports.disconnect;
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
