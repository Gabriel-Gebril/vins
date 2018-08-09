var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(express.static('./controllers'));

app.get("/", function(req,res){
    res.render("index");
});

app.listen(3000,console.log("Server on port 3000."));