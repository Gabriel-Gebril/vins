var express = require("express"),
    router = express.Router(),
    items = require("../controllers/itemsController");

router.get("/", items.itemsGET);

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

router.get("/:id/edit", items.showEdit)

router.put("/:id", items.editItem)

router.delete("/:id", items.deleteItem)

module.exports = router;