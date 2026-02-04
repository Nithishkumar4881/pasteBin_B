const express = require("express");
const router = express.Router();

const {  viewHTML } = require("../controller/apiController.js")

router.get("/p/:id", viewHTML)
module.exports = router;