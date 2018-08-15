var express = require("express"),
    router = express.Router(),
    items = require("../controllers/itemsController");

router.get("/:page", items.itemsGET);


module.exports = router;