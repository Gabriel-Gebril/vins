var express = require("express"),
    router = express.Router(),
    items = require("../controllers/itemsController");

var authCheck = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/auth/google");
};

var isInstructor = (req,res,next) => {
    if(req.isAuthenticated() && (req.user.role === "admin" || req.user.role === "cc" || req.user.role === "instructor")){
        return next();
    }else if(!req.isAuthenticated()){
        return res.redirect("/auth/google");
    }
    res.redirect("/accessDenied");
}

var isAdmin = (req,res,next) => {
    console.log(req.user.role);
    if(req.isAuthenticated() && req.user.role === "admin"){
        return next();
    }else if(!req.isAuthenticated()){
        return res.redirect("/auth/google");
    }
    res.redirect("/accessDenied");
}

var isCC = (req,res,next) => {
    if(req.isAuthenticated() && (req.user.role === "admin" || req.user.role === "cc")){
        return next();
    }else if(!req.isAuthenticated()){
        return res.redirect("/auth/google");
    }
    res.redirect("/accessDenied");
}

router.get("/", isInstructor , items.itemsGET);

router.get("/search", isInstructor , items.itemsSearch);

router.get("/new", isCC , function(req,res){
    if(req.user.role === "admin"){
        var r = "admin/";
    }else{
        var r = "cc/"
    }
    var newItems = {
        itemName : "", 
        instock : "",
        total : "",
        description : "",
        location : ""
    }
    res.render(r+"newItem", {items : newItems, nItems : 1, dupItem : "0"});
});

router.post("/", isCC , items.newItem)

router.get("/:id", isInstructor , items.showItem);

router.get("/:id/edit", isAdmin , items.showEdit);

router.put("/:id",isAdmin , items.editItem);

router.put("/:id/add", isCC, items.addToItem);

router.delete("/:id", isAdmin , items.deleteItem);

module.exports = router;