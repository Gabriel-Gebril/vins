var db = require('../helpers/db');

var createUsers = `CREATE TABLE IF NOT EXISTS users(uid VARCHAR(255) NOT NULL,username VARCHAR(255) NOT NULL,role VARCHAR(255) NOT NULL,PRIMARY KEY (uid))`;

db.query(createUsers,function(err,result){
    if (err){
        console.log(err);
    }else{
        //console.log(result);
    }
});

exports.createUser = function(obj, callback){
    var sql = "INSERT INTO users(uid,username,role) VALUES("+obj.uid+","+"\""+obj.username+"\""+"," +"\""+obj.role+"\""+")";
    db.query(sql,function(err,result){
        return callback(err,result);
    });
}

exports.find = function(obj, callback){
    var sql = "SELECT * FROM users WHERE uid LIKE " + obj.uid;
    
    db.query(sql,function(err,result){
        return callback(err, result);
    });
}