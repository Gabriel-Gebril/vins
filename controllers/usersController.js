var users = require("../models/user"),
    express = require("express");
var items = require("../models/item");
var checkedout = require("../models/checkedOut");

exports.usersGET = function(req, res){
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
        res.redirect("/users");
        return
    }else{
        var num = parseInt(req.query.count);
    }
    
    users.getUsers([num * 50,50],function(err,result){
        if(isNaN(parseInt(req.query.count))){
            res.render("admin/users", {user: result, page :  parseInt(req.query.count), search : ""});
        }else if (result.length === 0){
            res.redirect("/users/?count=" + (parseInt(req.query.count)-1));
        }else{
            res.render("admin/users", {user: result, page :  parseInt(req.query.count), search : ""});
        }
        
    });
    
}

exports.showEditUser = function(req,res){
    var id = req.params.id;
    // console.log(id);
    users.find({uid:id},function(err, result){
        res.render("admin/editUser",{user:result[0],msg : "", editor : req.user.uid})
    });
 }

 exports.showUser = function(req,res){
    var id = req.params.id;
    users.find({uid:id},function(err, result){
        // console.log(result);
        res.render("admin/showUser",{user:result[0]});
    });
 }

 exports.deleteUser = function(req, res){
     var id = req.url;
     id = id.substr(1);
    
     users.removeById(id, function(err, result){
        if (err){
            // console.log(err);
        }else{
            res.redirect("/users");
        }
     })
 }

 exports.usersSearch = function(req,res){
    if (isNaN(parseInt(req.query.count))){
        var num = 0;
    }else if(parseInt(req.query.count) <= 0){
        res.redirect("/users");
        return
    }else{
        var num = parseInt(req.query.count);
    }

    users.findByName(req.query.q,num*50,function(result){
        // if (result.length === 0){
        //      res.render("admin/search", {item: result,message : "No item with that name found", page :  parseInt(req.query.count), search : req.query.q});
        // }else{
        //     res.render("admin/search", {item: result,message : "", page :  parseInt(req.query.count), search : req.query.q});
        // }
        // console.log(result);
        if(isNaN(parseInt(req.query.count))){
            res.render("admin/userSearch", {user: result, page :  parseInt(req.query.count), message : "", search:req.query.q});
        }else if (result.length === 0){
            res.redirect("/users/search?q="+req.query.q+"&count=" + (parseInt(req.query.count)-1));
        }else{
            res.render("admin/userSearch", {user: result, page :  parseInt(req.query.count), message : "", search:req.query.q});
        }
    })
}


exports.editUser = function(req,res){

    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }
    var Iid = req.params.id;

    var userCon = req.body;
    // console.log(userCon);
    
    var newUser = {
        uid : Iid,
        username : userCon.username, 
        role : userCon.role
    }
    // console.log(newUser);
    users.update(newUser, function(err,result){
        res.redirect("/users/"+newUser.uid);
    
    });
    
}

exports.deleteUser = function(req, res){
    var id = req.params.id

    checkedout.userSavedCart(id, function(err, sCart){
        // console.log(err)
        
        sCart.forEach(function(cartI) {
            
            items.findById(cartI.id, function(err1,invItem){
                // console.log(invItem);
                modI = {
                    name : invItem[0].name,
                    instock : invItem[0].instock + cartI.qty,
                    total : invItem[0].total,
                    description : invItem[0].description,
                    location : invItem[0].location,
                    id : invItem[0].id
                }
                //  console.log(modI);
                items.update(modI,function(err2,result1){
                    
                });
            });
        });

        users.removeById(id, function(err3, result2){
            if (err){
                // console.log(err3);
            }else{
                res.redirect("/users");
            }
         });
            
           
        
    });

    
}
