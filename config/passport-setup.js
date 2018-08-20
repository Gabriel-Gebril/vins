var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var users = require("../models/user")

passport.serializeUser((user,done)=>{
    done(null,user.uid);
});

passport.deserializeUser((uid,done)=>{
    users.find({uid:uid},function(err,result){
        done(null,result[0]);
    });
});

passport.use(
    new GoogleStrategy({
        clientID : keys.google.clientID,
        clientSecret : keys.google.clientSecret,
        callbackURL: "/auth/google/redirect"
    },function(accessToken, refreshToken, profile, done){
        if (profile._json.domain === "mcmaster.ca"){
            // console.log("hit");
            users.find({uid:profile._json.id},function(err,resultf1){
                //Didn't find a user
                if (resultf1.length === 0){
                    users.createUser({uid : profile._json.id, username : profile._json.displayName, role : ""},function(err,result){
                        user.find({uid:profile._json.id},function(err,resultf2){
                            done(null,resultf2);
                        });
                    });
                }else{ //found a user
                    done(null,resultf1[0]);
                }
                
            });
            
        }else{
            return done(null,null);
        }
    })
);