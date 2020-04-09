// Imports.
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '8jiy7gj5cghc55gjhg45kjlm564vtyi87dz993rdngil68hfbk35hg34ggj';

// Exported function.

module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId: userData.id
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '4h'
        })
    },
    parseAuthorization: function(authorization){
        return  (authorization != null) ? authorization.replace('Bearer ', '') : null;
        // console.log('PARSE'+authorization);
    },
    getUserId: function(authorization){

        console.log('GET '+authorization);

        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null) {
                    userId = jwtToken.userId;
                }
            } catch(err) {}
        }
        return userId;
    }
}
