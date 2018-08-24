var db = require('../helpers/db');


//TODO Refactor database for signed_out_by to be a list of user ids.
var createCheckedOut = `CREATE TABLE IF NOT EXISTS checkedout(`
                        +`uid VARCHAR(255) NOT NULL ,`
                        +`id VARCHAR(255) NOT NULL ,`
                        +`itemName VARCHAR(255) NOT NULL ,`
                        +`qty INT NOT NULL,`
                        +`reason VARCHAR(255) NOT NULL)`;

db.query(createCheckedOut, function(err,result){
    if(err){
        console.log(err);
    }
});

exports.createBulk = function(obj,callback){
    var sql = "INSERT INTO checkedOut(uid,id,itemName,qty,reason) VALUES";
    var values = "";
    if(Array.isArray(obj.qty)){
        for (let i = 0; i < obj.qty.length; i++) {
            if(i<(obj.qty.length-1)){
                values += "("+ "\'"+obj.uid+ "\'"+","+ "\'"+obj.id+ "\'"+`,`+ "\'"+obj.itemName+ "\'"+"," +obj.qty[i] +"," + "\'"+ obj.reason[i] + "\'"+"),"
            }else{
                values += "("+ "\'"+obj.uid+ "\'"+","+ "\'"+obj.id+ "\'"+`,`+ "\'"+obj.itemName+ "\'"+"," +obj.qty[i] +"," + "\'"+ obj.reason[i] + "\'"+")"
            }
            
        }
    }else{
        values += "("+ "\'"+obj.uid+ "\'"+","+ "\'"+obj.id+ "\'"+`,`+"\'"+obj.itemName+ "\'"+"," +obj.qty +"," + "\'"+obj.reason + "\'"+")"
    }
    
    console.log(sql+values);
    db.query(sql + values, function(err,result){
        return callback(err,result);
    });
    
}

exports.removeFromCheckedout = function(obj, callback){
    var sql =  `DELETE FROM checkedout WHERE uid=`+obj.uid + ` AND id=`+obj.id;
    db.query(sql, function(err,result){
        return callback(err,result);
    });
}

exports.userSavedCart = function(uid, callback){

    var sql = `SELECT * FROM checkedout WHERE uid=` + uid;
    db.query(sql, function(err,result){
        return callback(err,result);
    });

}