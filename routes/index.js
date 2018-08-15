var express = require("express"),
    router = express.Router(),
    items = require("./itemsRoute");

router.use(express.static('./public'));
router.use(express.static('./controllers'));

router.get("/", function(req,res){
    res.redirect("/items/0");
});

router.get("/items", function(req,res){
    res.redirect("/items/0");
});

router.use("/items", items);

module.exports = router;
