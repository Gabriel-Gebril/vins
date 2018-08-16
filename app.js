var express = require("express"),
    app = express(),
    faker = require('faker'),
    index = require("./routes/index"),
    db = require("./helpers/db"),
    item = require("./models/item"),
    body = require("body-parser");

app.use(express.static("/public"))
app.set("view engine", "ejs");

app.use(body.urlencoded({
    extended: true
}));


app.use(index);



// var newI = {
//     name: "test item j",
//     instock: 5,
//     total: 500,
//     description: "awesome item",
//     signed_out_by: "Gabriel"
// }

// item.create(newI, function(result){
//     console.log(result);
// });

// for (let index = 0; index < 100; index++) {
//     item.create({
//         name: "Test Item" + (index+1),
//         instock: index,
//         total: index + 100,
//         description: "",
//         signed_out_by: ""
//     }, function(result){

//     });
    
// }



app.listen(3000,function(){
            console.log('Serving app on port 3000');
});

