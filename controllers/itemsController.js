var items = require("../models/item"),
    express = require("express"),
    faker = require("faker")

exports.itemsGET = function(req, res){
    // var randomProduct = [];
    // for(var i = 0; i<80; i++){
    //     randomProduct.push(faker.commerce.productName())
    // }
    // var randomTotal = Math.random() * 1000
    // var randomAv = Math.random * randomTotal;
    // res.render("index", {randomProduct : randomProduct, randomTotal: randomTotal,randomAv: randomAv});
    
    if (isNaN(parseInt(req.query.count))){
        var num = 0;
    }else if(parseInt(req.query.count) <= 0){
        var num = 0;
        res.redirect("/items");
        return
    }else{
        var num = parseInt(req.query.count);
    }
    
    items.getItems([num * 50,50],function(err,result){
        if(isNaN(parseInt(req.query.count))){
            res.render("index", {item: result, page :  parseInt(req.query.count), search : ""});
        }else if (result.length === 0){
            res.redirect("/items/?count=" + (parseInt(req.query.count)-1));
        }else{
            res.render("index", {item: result, page :  parseInt(req.query.count), search : ""});
        }
        
    });
    
}

exports.itemsSearch = function(req,res){
    if (isNaN(parseInt(req.query.count))){
        var num = 0;
    }else if(parseInt(req.query.count) <= 0){
        res.redirect("/items");
        return
    }else{
        var num = parseInt(req.query.count);
    }

    items.findByName(req.query.q,num*50,function(result){
        if (result.length === 0){
             res.render("search", {item: result,message : "No item with that name found", page :  parseInt(req.query.count), search : req.query.q});
        }else{
            res.render("search", {item: result,message : "", page :  parseInt(req.query.count), search : req.query.q});
        }
    })
}

exports.newItem = function(req,res){

    var itemCon = req.body;
    
    var newItems = {
        itemName : itemCon.itemName, 
        instock : itemCon.amount,
        total : itemCon.amount,
        description : itemCon.description,
        location : itemCon.location
    }
    items.createBulk(newItems, function(err,result){
        if(err){
            console.log(err);
            if(Array.isArray(newItems.total)){
                n = newItems.total.length;
            }else{
                n = 1;
            }
            

        function getPosition(string, subString, index) {
            return string.split(subString, index).join(subString).length;
        }
        var errI = err.sqlMessage.slice(17,getPosition(err.sqlMessage,"\'",2));
            res.render("newItem", {items : newItems, nItems : n, dupItem : errI});
        }else{
            res.redirect("/items");
        }
    });
    
}

 exports.showItem = function(req,res){
    var id = req.url;
    id = parseInt(id.substr(1));
    items.findById(id,function(err, result){
        res.render("show",{item:result[0]})
    });
 }

 exports.deleteItem = function(req, res){
     var id = req.url;
     id = parseInt(id.substr(1));
     items.removeById(id, function(err, result){
        if (err){
            console.log(err);
        }else{
            res.redirect("/items");
        }
     })
 }

 exports.showEdit = function(req,res){
    var id = req.url;
    id = parseInt(id.substr(1));
    items.findById(id,function(err, result){
        res.render("editItem",{item:result[0],msg : ""})
    });
 }

 exports.editItem = function(req,res){

    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }
    var Iid = req.url.substr(1);
    console.log(getPosition(Iid, "?_method", 1));
    Iid = Iid.substring(0,getPosition(Iid, "?_method", 1));
    Iid = parseInt(Iid);

    var itemCon = req.body;
    console.log(itemCon);
    
    var newItem = {
        id : Iid,
        name : itemCon.name, 
        instock : itemCon.instock,
        total : itemCon.total,
        description : itemCon.description,
        location : itemCon.location
    }
    items.update(newItem, function(err,result){
        if(err){
            var errI = err.sqlMessage.slice(17,getPosition(err.sqlMessage,"\'",2));
            res.render("editItem", {item : newItem, msg : "Item " + errI + " already in database! Please choose another name or edit the existing item!"});
        }else{
            res.redirect("/items/"+newItem.id);
        }
    });
    
}