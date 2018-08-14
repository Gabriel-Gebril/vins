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
        console.log(result);
    }
});

exports.create = function(name, instock, total, desc, signed_out_by){
    var sql = "INSERT INTO items(name,instock,total,description,signed_out_by) VALUES("+"\""+name+"\""+"," +instock +"," + total +"," +"\""+desc+"\""+"," + "\""+signed_out_by+"\"" +")";

    db.query(sql , function(err,result){
        if(err){
            console.log(err.errno);
        }else{
            console.log(result);
        }
    });
}