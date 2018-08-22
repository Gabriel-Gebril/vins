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

var gracefulShutdown = function(){
    db.end();
    server.close(function() {
        console.log("Closed out remaining connections.");
        process.exit()
      });
      
       // if after 
       setTimeout(function() {
           console.error("Could not close connections in time, forcefully shutting down");
           process.exit()
      }, 10*1000);
    
}

// listen for TERM signal .e.g. kill 
process.on ('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on ('SIGINT', gracefulShutdown);   


var server = app.listen(3000,function(){
     console.log('Serving app on port 3000');
});

