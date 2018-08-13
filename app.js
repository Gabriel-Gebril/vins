var express = require("express"),
    app = express(),
    faker = require('faker');
    index = require("../vins/routes/index");

app.use(index);

app.listen(3000,console.log("Server on port 3000."));