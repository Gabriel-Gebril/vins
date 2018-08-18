var express = require("express"),
    router = express.Router(),
    items = require("../controllers/itemsController");

router.get("/", items.itemsGET);

router.get("/search", items.itemsSearch);

router.get("/new", function(req,res){
    res.render("newItem");
});

router.post("/", items.newItem)

router.get("/:id", items.showItem);

router.delete("/:id", items.deleteItem)

module.exports = router;