var express = require("express"),
    router = express.Router(),
    cart = require("../controllers/cartController");

var isCC = (req,res,next) => {
    if(req.isAuthenticated() && (req.user.role === "admin" || req.user.role === "cc")){
        return next();
    }else if(!req.isAuthenticated()){
        return res.redirect("/auth/google");
    }
    res.redirect("/accessDenied");
}

router.get('/', isCC, cart.getCart);

router.post('/', isCC, cart.saveCart);

module.exports = router;