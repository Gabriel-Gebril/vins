var express = require("express"),
    app = express(),
    faker = require('faker'),
    index = require("./routes/index"),
    db = require("./helpers/db"),
    item = require("./models/item");

app.set("view engine", "ejs");
app.use(index);


var newI = {
    name: "test item j",
    instock: 5,
    total: 500,
    description: "awesome item",
    signed_out_by: "Gabriel"
}

// item.create(newI, function(result){
//     console.log(result);
// });

item.findById(5, function(result){
     console.log(result[0]);
});



app.listen(3000,function(){
            console.log('Serving app on port 3000');
});

