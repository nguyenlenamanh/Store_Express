const db = require('../database/db');
const md5 = require('md5');

module.exports.login = (req,res) => {
    res.render("../public/signin", {
        user: null,
        errs: []
    });
}

module.exports.postLogin = (req,res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    var redirectTo = req.session.redirectTo || '/';
    console.log(redirectTo);
    delete req.session.redirectTo;

    var user = db.get("users").find({email: email}).value();

    if(!user) {
        res.render('../public/signin', {
            user: {
               email: email, 
               password: password
            },
            errs: [
                "Không tồn tại người dùng này"
            ]
        });
    };

    var passwordHashed = md5(user.salt + password + user.id);

    if(user.password !== passwordHashed) {
        res.render('../public/signin', {
            user: {
                email: email, 
                password: password
             },
            errs: [
                "Mật khẩu không chính xác"
            ]
        });
    }

    res.cookie("userID",user.id, {
        'signed': true
    });

    res.redirect(redirectTo);
}