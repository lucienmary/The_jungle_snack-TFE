// Imports.
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var gameCtrl = require('./routes/gameCtrl');

// Router.
exports.router = (function() {
    var apiRouter = express.Router();

    // Users routes.
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);

    // Jeu routes.
    // apiRouter.route('/jeu/salon').get(gameCtrl.playerProfile);

    return apiRouter;
})();
