const db = require('../database/db');

module.exports = (req,res,next) => {
    
    if(req.signedCookies.userID) {
        next();
        return;
    }
    
    if(!req.signedCookies.sessionID) {
        var sessionID = require('shortid').generate();
        res.cookie('sessionID',sessionID, {
            signed: true
        });

        db.get('sessions').push({
            id: sessionID
        }).write();
    }

    next();
}

