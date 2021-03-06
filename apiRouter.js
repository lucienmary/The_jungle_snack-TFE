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
    apiRouter.route('/users/delete/').put(usersCtrl.deleteUserProfile);
    apiRouter.route('/users/new-psw/').put(usersCtrl.updateUserPsw);

    apiRouter.route('/users/disconnect/').get(usersCtrl.disconnect);
    // Jeu routes.
    // apiRouter.route('/salon').get(usersCtrl.getUserProfile);

    return apiRouter;
})();
