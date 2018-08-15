var express = require("express"),
    router = express.Router(),
    items = require("../controllers/itemsController");

router.get("/", items.itemsGET);


module.exports = router;