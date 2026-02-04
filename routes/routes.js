const express = require("express");
const router = express.Router();

const { create, healthz, view } = require("../controller/apiController.js")

router.get("/healthz", healthz)
router.post("/pastes", create)
router.get("/pastes/:id", view)


module.exports = router;