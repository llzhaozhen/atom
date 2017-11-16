var MongoClient=require('mongodb').MongoClient;
var DB_CONN_STR='mongodb://localhost:27017/RUNOOB';

var delData=function(db,callback){
  var collection=db.collection('site');

  var whereStr={"name":'菜鸟工具'};

  collection.remove(whereStr,function(err,result){

    if(err){
      console.log(err);
    }
    callback(result);
  });

}

MongoClient.connect(DB_CONN_STR, function(err, db) {
  console.log("连接成功！");
  delData(db, function(result) {
    console.log(result);
    db.close();
  });
});
