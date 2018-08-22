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

exports.findByName = function(username,offset,callback){
    var sql = `SELECT * FROM users WHERE username LIKE "%` + [username] + `%" LIMIT ` + offset + `,50`;

    db.query(sql,function(err,result){
        if (err){
            console.log(err);
        }else{
           return callback(result);
        }
    });
}

exports.getUsers = function(startStop, callback){
    var sql = `SELECT * FROM users LIMIT ` + startStop[0] + "," + startStop[1];

    db.query(sql, function(err,result){
        return callback(err,result);
    });
}

exports.update = function(userObj, callback){
    var sql = `UPDATE users SET username=` 
    + "\"" + userObj.username + "\""
    + `, role=` + "\"" + userObj.role + "\""
    + ` WHERE uid=` + userObj.uid; 
    console.log(sql);
    db.query(sql,function(err, result){
        
        return callback(err,result);
    });
}

exports.removeById = function(uid, callback){
    var sql =  `DELETE FROM users WHERE uid=` + uid;
    var sql2 =  `DELETE FROM checkedout WHERE uid=` + uid;
    db.query(sql, function(err1,result1){
        db.query(sql,function(){
            return callback(err1,result1);
        });
        
    });
}