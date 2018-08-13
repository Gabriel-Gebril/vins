var express = require("express"),
    app = express(),
    faker = require('faker'),
    index = require("./routes/index"),
    db = require("./helpers/db");

app.use(index);

var item = require("./models/item");

item.create("Test item2",5,100,"","");



app.listen(3000,function(){
            console.log('Serving app on port 3000');
});

