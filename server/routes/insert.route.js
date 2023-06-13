const insertController = require("../controllers/insertData.controller.js");

const router = require("express").Router();

router.post("/", insertController.insertData);
router.post("/category", insertController.insertCategory);

module.exports = router;
