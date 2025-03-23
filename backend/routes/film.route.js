const express = require("express");
const router = express.Router();

const filmController = require("../controllers/film.controller");

// film title : Route_66 ....
router.get("/Route_66", filmController.getFilmInformation);

module.exports = router;
