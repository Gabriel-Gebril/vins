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
        signed_out_by : "",
        location : ""
    }
    res.render("newItem", {items : newItems, nItems : 1});
});

router.post("/", items.newItem)

router.get("/:id", items.showItem);

router.delete("/:id", items.deleteItem)

module.exports = router;