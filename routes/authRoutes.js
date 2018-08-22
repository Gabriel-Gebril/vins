var router = require("express").Router(),
    passport = require("passport");

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('https://accounts.google.com/logout');
});

router.get('/google', passport.authenticate("google",{
    scope : ['profile','email']
}));

router.get('/google/redirect',passport.authenticate('google',{ successRedirect: '/', failureRedirect: '/accessDenied'}
), function(req,res){
    res.redirect("/items");
});

module.exports = router;