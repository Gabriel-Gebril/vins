var express = require("express"),
    app = express(),
    index = require("./routes/index"),
    user = require("./routes/usersRoute"),
    body = require("body-parser"),
    methodOverride = require("method-override"),
    authRoutes = require('./routes/authRoutes'),
    passportSetup = require('./config/passport-setup'),
    passport = require("passport"),
    cartRoutes = require("./routes/cartRoutes");

var db = require('./helpers/db');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var Cart = require('./models/cart');

var sessionStore = new MySQLStore({},db);

app.use(session({
    key: 'noidea',
    secret: 'isokay',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(function(req,res,next){
    res.locals.session = req.session;
    req.session.cart = new Cart(req.session.cart ? req.session.cart : {});
    next();
});

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

app.use(body.urlencoded({
    extended: true
}));

app.use(methodOverride("_method"));

app.use('/auth',authRoutes);

app.use(index);
app.use("/users",user);
app.use("/cart",cartRoutes);


app.listen(3000,function(){
     console.log('Serving app on port 3000');
});

