var express = require("express"),
    router = express.Router(),
    items = require("../controllers/itemsController");

var authCheck = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/auth/google");
};

router.get("/", authCheck , items.itemsGET);

router.get("/search", items.itemsSearch);

router.get("/new", function(req,res){
    var newItems = {
        itemName : "", 
        instock : "",
        total : "",
        description : "",
        location : ""
    }
    res.render("newItem", {items : newItems, nItems : 1, dupItem : "0"});
});

router.post("/", items.newItem)

router.get("/:id", items.showItem);

router.get("/:id/edit", items.showEdit);

router.put("/:id", items.editItem);

router.put("/:id/add", items.addToItem);

router.delete("/:id", items.deleteItem);

module.exports = router;