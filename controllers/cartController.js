var items = require("../models/item"),
    express = require("express"),
    faker = require("faker"),
    Cart = require('../models/cart'),
    checkedOut = require("../models/checkedOut")

    

exports.getCart = function(req,res){
    if(req.user.role === "cc"){
        var r = "cc/";
    }else if(req.user.role === "admin"){
        var r = "admin/";
    }else{
        var r = "";
    }

    var pendingCart = req.session.cart.generateArray();

    checkedOut.userSavedCart(req.session.passport.user, function(err,result){
        res.render(r+"cart", {pendingCart : pendingCart, savedCart : result, msg : ""});
    });

    
}

exports.saveCart = function(req,res){

    if(req.user.role === "cc"){
        var r = "cc/";
    }else if(req.user.role === "admin"){
        var r = "admin/";
    }else{
        var r = "";
    }

    var itemCon = req.body;

    var pendingCart = req.session.cart.generateArray();
    
    var newItems = {
        uid : req.session.passport.user, 
        itemName : [],
        qty : itemCon.qty,
        reason : itemCon.reason
    }

    var valid = true;
    for(var i = 0; i < pendingCart.length; i++){
        newItems.itemName.push(pendingCart[i].item.name);
        if(itemCon.qty[i] > pendingCart[i].item.instock){
            valid = false;
            break;
        }
    }

    if (!valid){
        checkedOut.userSavedCart(req.session.passport.user, function(err,result){
            res.render(r+"cart", {pendingCart : pendingCart, savedCart : result, msg : "Can't checkout more than we have! Considering requesting more."});
        });
    }else{
        for(var i = 0; i < pendingCart.length; i++){
            var modItem = {
                name : pendingCart[i].item.name,
                instock : (parseInt(pendingCart[i].item.instock) - parseInt(itemCon.qty)),
                total : pendingCart[i].item.total,
                description : pendingCart[i].item.description,
                location : pendingCart[i].item.location,
                id : pendingCart[i].item.id
            }
            items.update(modItem,function(err,result){
                console.log(err);
            }); 
        }


        checkedOut.createBulk(newItems, function(err,result){
            console.log(result);
            console.log(err);
            req.session.cart = {};
            res.redirect("/cart");
        });
    }

    

}

