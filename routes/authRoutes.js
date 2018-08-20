var router = require("express").Router(),
    passport = require("passport");

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate("google",{
    scope : ['profile','email']
}));

router.get('/google/redirect',passport.authenticate('google',{ successRedirect: '/', failureRedirect: '/auth/google'}
), function(req,res){
    res.redirect("/items");
});

module.exports = router;