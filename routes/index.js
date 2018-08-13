var express = require("express"),
    router = express.Router(),
    faker = require("faker"),
    app = express();

app.set("view engine", "ejs");
router.use(express.static('./public'));
router.use(express.static('./controllers'));

router.get("/", function(req,res){
    var randomProduct = [];
    for(var i = 0; i<80; i++){
        randomProduct.push(faker.commerce.productName())
    }
    var randomTotal = Math.random() * 1000
    var randomAv = Math.random * randomTotal;
    res.render("index.ejs", {randomProduct : randomProduct, randomTotal: randomTotal,
     randomAv: randomAv});
});

module.exports = router;
