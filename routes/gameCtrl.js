// Imports
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

// Constants

// routes.
module.exports = {
    playerProfile: function(req, res){

        console.log('Player');

        var headerAuth  = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        asyncLib.waterfall([
            function(done){
                models.User.findOne({
                    where: { id: userId }
                })
                .then(function(userFound){
                    done(null, userFound);
                })
                .catch(function(err){
                    return res.status(500).json({'error': 'unable to verify user' });
                });
            },
            function(userFound, done){
                if (userFound) {
                    return res.status(200).json(userFound);
                }else {
                    res.status(404).json({'error': 'user not found'});
                }
            }
        ])
    }
}
