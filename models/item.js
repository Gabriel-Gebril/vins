var db = require('../helpers/db');


//TODO Refactor database for signed_out_by to be a list of user ids.
var createItems = `CREATE TABLE IF NOT EXISTS items(
                        id INT NOT NULL AUTO_INCREMENT,
                        name VARCHAR(255) NOT NULL,
                        instock INT NOT NULL,
                        total INT NOT NULL,
                        description TEXT,
                        location VARCHAR(255) NOT NULL,
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

//Don't use this, use createBulk instead!
// exports.create = function(obj,callback){
//     var sql = "INSERT INTO items(name,instock,total,description,signed_out_by) VALUES("+"\""+obj.name+"\""+"," +obj.instock +"," + obj.total +"," +"\""+obj.description+"\""+"," + "\""+obj.signed_out_by+"\"" +")";
//     db.query(sql , function(err,result){
//         if(err){
//             return callback(err,result);
//         }else{
//             return callback(err,result);
//         }
//     });
    
// }

exports.createBulk = function(obj,callback){
    var sql = "INSERT INTO items(name,instock,total,description,location) VALUES";
    var values = "";
    if(Array.isArray(obj.itemName)){
        for (let i = 0; i < obj.itemName.length; i++) {
            if(i<(obj.itemName.length-1)){
                values += "("+"\""+obj.itemName[i].toLowerCase()+"\""+"," +obj.instock[i] +"," + obj.total[i] +"," +"\""+obj.description[i]+"\""+","  +"\""+ obj.location[i]+"\"" +"),"
            }else{
                values += "("+"\""+obj.itemName[i].toLowerCase()+"\""+"," +obj.instock[i] +"," + obj.total[i] +"," +"\""+obj.description[i]+"\""+","  +"\""+ obj.location[i]+"\"" +")"
            }
            
        }
    }else{
        values += "("+"\""+obj.itemName.toLowerCase()+"\""+"," +obj.instock +"," + obj.total +"," +"\""+obj.description+"\"" +"," +"\""+ obj.location+"\"" +")"
    }
    

    db.query(sql + values, function(err,result){
        return callback(err,result);
    });
    
}


exports.findById = function(itemid, callback){
    var sql = "SELECT * FROM items WHERE id LIKE " + itemid;

    db.query(sql,function(err,result){
        return callback(err, result);
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
        return callback(err,result);
        
    });
}

exports.removeById = function(id, callback){
    var sql =  `DELETE FROM items WHERE id=` + id;
    db.query(sql, function(err,result){
        return callback(err,result);
    });
}

exports.update = function(itemObj, callback){
    var sql = `UPDATE items SET name=` 
    + "\"" + itemObj.name + "\""
    + `, instock=` + itemObj.instock
    + `, total=` +  itemObj.total 
    + `, description=` + "\"" + itemObj.description + "\""
    + `, location=` + "\"" + itemObj.location + "\""
    + ` WHERE id=` + itemObj.id; 

    db.query(sql,function(err, result){
        return callback(err,result);
    });
}

exports.usersCheckOut = function(name, callback){

    var sql = "SELECT username, qty, reason FROM checkedout t1 INNER JOIN users t2 on t1.uid = t2.uid WHERE t1.itemName='" + name + "\'";

    db.query(sql, function(err, result){
        return callback(err,result);
    });

}