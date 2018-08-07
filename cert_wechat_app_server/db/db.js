let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    console.log(err, db);
    if (err) throw err;
    console.log("数据库已创建!");
    db.close();
})