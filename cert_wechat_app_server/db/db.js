let mongodb = require('mongodb');
// let mongoose = require("mongoose");



let mongoClient = mongodb.MongoClient;
let url = "mongodb://localhost:27017/";
mongoClient.connect(url, function (err, db) {
    console.log(err, db);
    if (err) throw err;
    console.log("数据库已创建!");
    db.close();
});
// let db = mongoClient.connection;
// db.on('error', console.error.bind(console, '... connect error ...'));
// db.once('open', function callback() {
//     console.info("... db open ...");
// });


/* mongoose */
// let url = "mongodb://127.0.0.1:27017/mongo";   //mongo是我的数据库
// let db = mongoose.connect(url);                     //连接数据库
//
// db.connection.on("error", function (error) {
//     console.log("数据库连接失败：" + error);
// });
// db.connection.on("open", function () {
//     console.log("数据库连接成功");
// });




/* mongodb */
// let dbServer = new mongodb.Server('localhost',27017,{auto_reconnect:true});
// let db = new mongodb.Db('mydb',dbServer,{safe:true});
// db.open(function(err, db){
//     if(!err) {
//         console.log('connect');
//         // 有两种方法链接collection，分别为：
//         db.collection('mycoll',function(err,coll){});
//         db.createCollection('mycoll',function(err,coll){});
//     } else {
//         console.log(err);
//     }
// });