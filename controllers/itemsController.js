var items = require("../models/item"),
    express = require("express"),
    faker = require("faker"),
    Cart = require('../models/cart');

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

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
    if(req.user.role === "instructor"){
        var r = "instructor/";
    }else if(req.user.role === "admin"){
        var r = "admin/";
    }else{
        var r = "";
    }
    
    items.getItems([num * 50,50],function(err,result){
        if(isNaN(parseInt(req.query.count))){
            res.render(r+"index", {item: result, page :  parseInt(req.query.count), search : ""});
        }else if (result.length === 0){
            res.redirect("/items/?count=" + (parseInt(req.query.count)-1));
        }else{
            res.render(r+"index", {item: result, page :  parseInt(req.query.count), search : ""});
        }
        
    });
    
}

exports.itemsSearch = function(req,res){
    // if (isNaN(parseInt(req.query.count))){
    //     var num = 0;
    // }else if(parseInt(req.query.count) <= 0){
    //     res.redirect("/items");
    //     return
    // }else{
    //     var num = parseInt(req.query.count);
    // }

    if (isNaN(parseInt(req.query.count))){
        var num = 0;
    }else if(parseInt(req.query.count) <= 0){
        var num = 0;
        res.redirect("/items/search?q="+req.query.q);
        return
    }else{
        var num = parseInt(req.query.count);
    }

    if(req.user.role === "instructor"){
        var r = "instructor/";
    }else if(req.user.role === "admin"){
        var r = "admin/";
    }else{
        var r = "";
    }

    items.findByName(req.query.q,num*50,function(result){
        // if (result.length === 0){
        //      res.redirect("/items/search?q=" +req.query.q+"&count="+req.query.count);
        // }else{
        //     res.render(r+"search", {item: result,message : "", page :  parseInt(req.query.count), search : req.query.q});
        // }
        if(isNaN(parseInt(req.query.count))){
            res.render(r+"search", {item: result, page :  parseInt(req.query.count), message : "", search:req.query.q});
        }else if (result.length === 0){
            res.redirect("/items/search?q="+req.query.q+"&count=" + (parseInt(req.query.count)-1));
        }else{
            res.render(r+"search", {item: result, page :  parseInt(req.query.count), message : "", search:req.query.q});
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

    if(req.user.role === "admin"){
        var r = "admin/";
    }else{
        var r = "cc/"
    }

    items.createBulk(newItems, function(err,result){
        if(err){
            console.log(err);
            if(Array.isArray(newItems.total)){
                n = newItems.total.length;
            }else{
                n = 1;
            }

        
        var errI = err.sqlMessage.slice(17,getPosition(err.sqlMessage,"\'",2));
            res.render(r+"newItem", {items : newItems, nItems : n, dupItem : errI});
        }else{
            res.redirect("/items");
        }
    });
    
}

 exports.showItem = function(req,res){
    if(req.user.role === "instructor"){
        var r = "instructor/";
    }else if(req.user.role === "admin"){
        var r = "admin/";
    }else{
        var r = "";
    }
    var id = req.params.id;

    

    items.findById(id,function(err, result){
        console.log(result[0].name);
        items.usersCheckOut(result[0].name,function(err2,result2){
            console.log(err2);
            res.render(r+"show",{item:result[0], checkedOut : result2});
        });
        
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
    id = id.slice(1,getPosition(id,"/edit",1));
    items.findById(id,function(err, result){
        res.render("editItem",{item:result[0],msg : ""})
    });
 }

 exports.editItem = function(req,res){
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

    if (itemCon.instock > itemCon.total){
        res.render("editItem", {item : newItem, msg : "Can't have more instock than total!"});
    }else{
         items.update(newItem, function(err,result){
        if(err){
            var errI = err.sqlMessage.slice(17,getPosition(err.sqlMessage,"\'",2));
            res.render("editItem", {item : newItem, msg : "Item " + errI + " already in database! Please choose another name or edit the existing item!"});
        }else{
            res.redirect("/items/"+newItem.id);
        }
    });
    }

   
    
}

exports.addToItem = function(req,res){

    var Iid = req.url.substr(1);
    console.log(getPosition(Iid, "?_method", 1));
    Iid = Iid.substring(0,getPosition(Iid, "?_method", 1));
    Iid = parseInt(Iid);

    var itemCon = req.body;
    items.findById(Iid,function(err,result){
        if (err){
            return res.render("show",{item:result[0]});
        }
        result[0].total = parseInt(result[0].total)+parseInt(itemCon.amount);
        result[0].instock = parseInt(result[0].instock)+parseInt(itemCon.amount);
        items.update(result[0], function(err,result){
            res.redirect("/items/"+Iid);
        });
    });
}


exports.itemToCart = function(req,res,next){
    var itemId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    items.findById(itemId, function(err, result){
        if(err){
            return res.redirect('/');
        }else{
            // console.log(result[0]);
            cart.add(result[0], result[0].id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/items/'+itemId);
        }
    });
}

exports.itemFromCart = function(req,res,next){
    var itemId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
            // console.log(result[0]);
    cart.remove(itemId);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/cart');
    
}
