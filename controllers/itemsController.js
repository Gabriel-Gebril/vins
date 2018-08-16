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
        if (result.length === 0){
            res.redirect("/items/?count=" + (parseInt(req.query.count) - 1));
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
            res.redirect("/items/search?q=" + req.query.q);
        }else{
            res.render("search", {item: result, page :  parseInt(req.query.count), search : req.query.q});
        }
    })
}

exports.newItem = function(req,res){

    var itemCon = req.body;
    var sb = []
    for (let i = 0; i < itemCon.itemName.length; i++) {
        sb.push("");
    }
        var newItem = {
            itemName : itemCon.itemName, 
            instock : itemCon.amount,
            total : itemCon.amount,
            description : itemCon.description,
            signed_out_by : sb
        }
        items.createBulk(newItem, function(err,result){
            if(err){
                res.send(err);
            }else{
                res.redirect("/items");
            }
        });
   
    
}