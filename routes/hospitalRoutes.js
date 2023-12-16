const express = require("express");
const router = express.Router();
const authHospitalMiddleware = require("../middlewares/authMiddleware");

const loginController = require("../controllers/hospitalControllers/authControllers/login");
const registerController = require("../controllers/hospitalControllers/authControllers/register");
const logoutController = require("../controllers/hospitalControllers/authControllers/logout");
const refreshController = require("../controllers/hospitalControllers/authControllers/refresh");
const treatmentControllers = require("../controllers/hospitalControllers/treatmentControllers");
const specialtiesControllers = require("../controllers/hospitalControllers/specialtiesControllers");
const facilitiesControllers = require("../controllers/hospitalControllers/facilitiesControllers");

// [+] Auth routes
router.post("/signup", registerController.register);
router.post("/signin", loginController.login);
router.post("/signout", logoutController.logout);
router.post("/refresh", refreshController.refresh);

// [+] Treatment
router.post(
  "/treatments",
  authHospitalMiddleware,
  treatmentControllers.addTreatment
);

// [+] Specialties
router.post(
  "/specialties",
  authHospitalMiddleware,
  specialtiesControllers.addSpecialties
);

// [+] Facilities
router.post(
  "/facilities",
  authHospitalMiddleware,
  facilitiesControllers.addFacilities
);

module.exports = router;
