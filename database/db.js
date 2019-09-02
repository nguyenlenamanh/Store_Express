const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database/db.json');
const db = low(adapter);

const shortid = require('shortid');

var cates = [
    {id: shortid.generate(), name: "Đồ gia dụng"},
    {id: shortid.generate(), name: "Đồ điện tử"},
    {id: shortid.generate(), name: "Hàng hóa tiêu dùng"}
];

var products = [
]

db.defaults({ categories: cates, products: []}).write();

module.exports = db;