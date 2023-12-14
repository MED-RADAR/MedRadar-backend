const express = require("express");
const loginController = require("../controllers/hospitalControllers/authControllers/login");
const registerController = require("../controllers/hospitalControllers/authControllers/register");
const logoutController = require("../controllers/hospitalControllers/authControllers/logout");
const refreshController = require("../controllers/hospitalControllers/authControllers/refresh");
const router = express.Router();

// Auth routes
router.post("/signup", registerController.register);
router.post("/signin", loginController.login);
router.post("/signout", logoutController.logout);
router.post("/refresh", refreshController.refresh);

module.exports = router;
