const db = require('../database/db');

module.exports.requiredAuth = (req,res,next) => {
    console.log(req.originalUrl);
    
    req.session.redirectTo = req.originalUrl;

    if(!req.signedCookies.userID) {
        res.redirect('/auth/login');
        return;
    }

    var user =  db.get("users").find({id: req.signedCookies.userID}).value();

    if(!user) {
        res.redirect("/auth/login");
        return;
    }

    if(req.params.id) {
        if(req.params.id !== req.signedCookies.userID) {
            res.redirect("/auth/login");
            return;
        }
    }

    next();
}