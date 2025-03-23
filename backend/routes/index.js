const express = require("express");
const router = express.Router();
const filmRoute = require("./film.route");

router.use("/films", filmRoute);

module.exports = router;
