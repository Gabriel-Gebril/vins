var express = require("express"),
    router = express.Router(),
    items = require("./itemsRoute");

router.use(express.static('./public'));
router.use(express.static('./controllers'));
router.use(express.static("./node_modules"))

router.get("/", function(req,res){
    res.redirect("/items");
});

router.get("/accessDenied", function(req,res){
    res.render("accessDenied");
});

router.use("/items", items);

module.exports = router;
