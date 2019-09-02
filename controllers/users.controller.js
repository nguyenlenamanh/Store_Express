const db = require('../database/db');
const shortid = require('shortid');

module.exports.purchasePOST = (req,res) => {
    
};

module.exports.purchaseGET = (req,res) => {
    var sid = req.signedCookies.userID ? req.signedCookies.userID : req.signedCookies.sessionID;

    var count = 0;
    var products;

    if(req.signedCookies.userID) {
        count = getTotalProducts("users",sid);
        products = getArrayProducts("users",sid);
    }
    else {
        count = getTotalProducts("sessions",sid);
        products = getArrayProducts("sessions",sid);
    }

    var total = 0; 
    products.forEach((x) => {
       total += x.price;
    });

    res.render('../public/payment', {
        items: products,
        count: count,
        total: parseFloat(total).toFixed(2)
    });
}

module.exports.UserInfo = (req,res) => {
    res.end(req.signedCookies.userID);
}

function getTotalProducts(table,sid) {
    var count1 = 0;

    var products = db.get(table).find({ id: sid }).get('cart').value();

    for(var key in products) {
        count1 += products[key];
    }
    
    return count1;
}

function getArrayProducts(table,sid) {
    var products = db.get(table).find({ id: sid }).get('cart').value();

    var outputProducts = [];

    for(var key in products) {
        var pInDB = db.get('products').find({id: key}).value();
        var p = {
            name: pInDB.name,
            number: products[key],
            price: parseFloat(pInDB.price) * products[key]
        };
        outputProducts.push(p);
    }
    
    return outputProducts;
}
