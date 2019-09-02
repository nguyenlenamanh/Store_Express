const db = require('../database/db');
const shortid = require('shortid');

module.exports.addProduct = (req,res) => {
    product = {
        id: shortid.generate(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        cid: req.body.cid
    };

    //console.log(product);
    db.get('products').push(product).write();
    res.send("OK");
};

module.exports.getbyID = (req,res) => {
    //console.log(db.get('products').find({id: req.params.id}).value());
    res.render('../public/detail',{
        cates: db.get('categories').value(),
        pro: db.get('products').find({id: req.params.id}).value()
    });
}

module.exports.addtoCart = (req,res) => {
    var productID = req.params.id;

    if(req.signedCookies.userID) {
        var sid = req.signedCookies.userID;

      /*  var count = db.get('users').find({id: sid}).get('cart.' + productID, 0).value();
        db.get('users').find({id: sid}).set('cart.' + productID, count + 1).write();*/

        addProductToCart('users',sid,productID);

        res.redirect('/categories');

        return;
    }

    if(req.signedCookies.sessionID) {
        var sid = req.signedCookies.sessionID;

       /* var count = db.get('sessions').find({id: sid}).get('cart.' + productID, 0).value();
        db.get('sessions').find({id: sid}).set('cart.' + productID, count + 1).write();*/

        addProductToCart('sessions',sid,productID);

        res.redirect('/categories');

        return;
    }
}

function addProductToCart(table, sid, productID) {
    var count = db.get(table).find({id: sid}).get('cart.' + productID, 0).value();
    db.get(table).find({id: sid}).set('cart.' + productID, count + 1).write();
}