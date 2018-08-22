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
    checkedOut.userSavedCart(req.session.passport.user.uid, function(err,result){
        console.log(err);
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
        uid : req.session.passport.user.uid, 
        id : [],
        itemName : [],
        qty : itemCon.qty,
        reason : itemCon.reason
    }

    var valid = true;
    for(var i = 0; i < pendingCart.length; i++){
        newItems.itemName.push(pendingCart[i].item.name);
        newItems.id.push(pendingCart[i].item.id);
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

exports.removeFromSaved = function(req, res){
    var rItem = {
        uid : req.session.passport.user.uid, 
        id : req.params.id,
        qty : req.body.qty
    }
    checkedOut.removeFromCheckedout(rItem, function(err,result){
        items.findById(rItem.id, function(err,result){
            var modItem = {
                name : result[0].name,
                instock : (parseInt(result[0].instock) + parseInt(rItem.qty)),
                total : result[0].total,
                description :result[0].description,
                location : result[0].location,
                id : req.params.id
            }
            items.update(modItem,function(err1,result1){
                console.log(err1);
            }); 
        });
        res.redirect('/cart');
    });
}
