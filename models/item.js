var db = require('../helpers/db');


//TODO Refactor database for signed_out_by to be a list of user ids.
var createItems = `CREATE TABLE IF NOT EXISTS items(
                        id INT NOT NULL AUTO_INCREMENT,
                        name VARCHAR(255) NOT NULL,
                        instock INT NOT NULL,
                        total INT NOT NULL,
                        description TEXT,
                        signed_out_by VARCHAR(255),
                        PRIMARY KEY (id),
                        UNIQUE (name)
                    )`;

db.query(createItems,function(err,result){
    if (err){
        console.log(err);
    }else{
        //console.log(result);
    }
});

exports.create = function(obj,callback){
    var sql = "INSERT INTO items(name,instock,total,description,signed_out_by) VALUES("+"\""+obj.name+"\""+"," +obj.instock +"," + obj.total +"," +"\""+obj.description+"\""+"," + "\""+obj.signed_out_by+"\"" +")";
    db.query(sql , function(err,result){
        if(err){
            console.log(err);
        }else{
            return callback(result);
        }
    });
    
}

exports.findById = function(itemid, callback){
    var sql = "SELECT * FROM items WHERE id LIKE " + itemid;

    db.query(sql,function(err,result, fields){
        if (err){
            console.log(err);
        }else{
           return callback(result);
        }
    });
}

exports.findByName = function(itemName, offset, callback){
    var sql = `SELECT * FROM items WHERE name LIKE "%` + [itemName] + `%" LIMIT ` + offset + `,50`;

    db.query(sql,function(err,result){
        if (err){
            console.log(err);
        }else{
           return callback(result);
        }
    });
}

exports.getItems = function(startStop, callback){
    var sql = `SELECT * FROM items LIMIT ` + startStop[0] + "," + startStop[1];

    db.query(sql, function(err,result){
        if (err){
            console.log(err);
        }else{
            return callback(result);
        }
    });
}