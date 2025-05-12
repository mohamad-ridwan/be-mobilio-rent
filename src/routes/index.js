"use strict";

const router = require("express").Router();

const agencies = require("./agencies");
const cars = require("./cars");

router.use("/agencies", agencies);
router.use("/cars", cars);

module.exports = router;
