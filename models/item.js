var db = require('../helpers/db');

exports.create = function(name, instock, total, desc, signed_out_by){
    var sql = "INSERT INTO items(name,instock,total,description,signed_out_by) VALUES("+"\""+name+"\""+"," +instock +"," + total +"," +"\""+desc+"\""+"," + "\""+signed_out_by+"\"" +")";

    db.query(sql , function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
}