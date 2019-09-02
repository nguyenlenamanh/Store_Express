const db = require('../database/db');

module.exports.categoriesAll = (req,res) => {
    res.render('../public/index',{
        cates: db.get('categories').value(),
        pros: db.get('products').value()
    });
};

module.exports.categoriesByID = (req,res) => {
    console.log(req.params.id);

    console.log(db.get('products').filter({cid:req.params.id}).value());

    res.render('../public/index',{
        cates: db.get('categories').value(),
        pros: db.get('products').filter({cid:req.params.id}).value()
    });
};
