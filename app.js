var express = require("express"),
    app = express(),
    index = require("./routes/index"),
    body = require("body-parser"),
    methodOverride = require("method-override"),
    authRoutes = require('./routes/authRoutes'),
    passportSetup = require('./config/passport-setup'),
    passport = require("passport");

app.use(require("express-session")({
    secret: "I hope this is okay",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

app.use(body.urlencoded({
    extended: true
}));

app.use(methodOverride("_method"));

app.use('/auth',authRoutes);

app.use(index);



app.listen(3000,function(){
            console.log('Serving app on port 3000');
});

