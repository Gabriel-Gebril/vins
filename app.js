var express = require("express");
var app = express();
var faker = require('faker');

app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(express.static('./controllers'));

app.get("/", function(req,res){
    var randomProduct = [];
    for(var i = 0; i<80; i++){
        randomProduct.push(faker.commerce.productName())
    }
    var randomTotal = Math.random() * 1000
    var randomAv = Math.random * randomTotal;
    res.render("index", {randomProduct : randomProduct, randomTotal: randomTotal,
     randomAv: randomAv});
});

app.listen(3000,console.log("Server on port 3000."));