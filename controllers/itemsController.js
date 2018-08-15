var items = require("../models/item"),
    express = require("express"),
    faker = require("faker");

exports.itemsGET = function(req, res){
    // var randomProduct = [];
    // for(var i = 0; i<80; i++){
    //     randomProduct.push(faker.commerce.productName())
    // }
    // var randomTotal = Math.random() * 1000
    // var randomAv = Math.random * randomTotal;
    // res.render("index", {randomProduct : randomProduct, randomTotal: randomTotal,randomAv: randomAv});
    if (parseInt(req.params.page)<0){
        res.redirect("/items/" + (parseInt(req.params.page)+1));
    }else{
        items.getItems([parseInt(req.params.page) * 50,50],function(result){
            if (result.length === 0){
                res.redirect("/items/" + (parseInt(req.params.page)-1));
            }else{
                res.render("index", {item: result, page :  parseInt(req.params.page)});
            }
            
        });
    }
    

}

