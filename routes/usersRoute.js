var express = require("express"),
    router = express.Router(),
    users = require("../controllers/usersController");

var isAdmin = (req,res,next) => {
    // console.log(req);
    if(req.isAuthenticated() && req.user.role === "admin"){
        return next();
    }else if(!req.isAuthenticated()){
        return res.redirect("/auth/google");
    }
    res.redirect("/accessDenied");
}

router.get("/", isAdmin , users.usersGET);

router.get("/search",isAdmin, users.usersSearch);

router.get("/:id", isAdmin, users.showUser);

router.put("/id", isAdmin, users.editUser);

router.get("/:id/edit", isAdmin, users.showEditUser);

router.put("/:id", isAdmin, users.editUser);

router.delete("/:id", isAdmin, users.deleteUser);


module.exports = router;
