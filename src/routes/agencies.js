const router = require("express").Router();

const { register, login } = require("../controllers/agencies");
const { add: addCar, listCars } = require("../controllers/cars");
const { authenticateToken } = require("../utils/middlewares");

router.post("/register", register);
router.post("/login", login);
router.post("/cars/add", authenticateToken, addCar);
router.post("/cars/lists", authenticateToken, listCars);

module.exports = router;
