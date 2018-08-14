var express = require("express"),
    app = express(),
    faker = require('faker'),
    index = require("./routes/index"),
    db = require("./helpers/db"),
    item = require("./models/item");

app.use(index);

item.create("Test item55",5,100,"","");



app.listen(3000,function(){
            console.log('Serving app on port 3000');
});

