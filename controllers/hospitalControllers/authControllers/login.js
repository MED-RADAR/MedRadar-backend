const hashServices = require("../../../services/hashServices");
const getHospitalServices = require("../../../services/hospitalServices/getHospitalServices");
const refreshHospitalServices = require("../../../services/hospitalServices/refreshHospitalServices");
const tokenServices = require("../../../services/tokenServices");
const CustomErrorHandler = require("../../../utils/CustomErrorHandler");

const loginController = {
  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(CustomErrorHandler.missingFields());
    }
    const hashedPassword = hashServices.hashPassword(password);
    try {
      const hospital = await getHospitalServices.getByEmail(email);

      if (!hospital) {
        return next(CustomErrorHandler.notFound("Invalid Email or Password"));
      }

      if (hashedPassword !== hospital.password) {
        return next(CustomErrorHandler.notFound("Invalid Email or Password"));
      }

      const { accessToken, refreshToken } = tokenServices.generateTokens({
        _id: hospital._id,
        approved: hospital.approved,
      });

      await refreshHospitalServices.storeRefreshToken(
        refreshToken,
        hospital._id
      );

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
        sameSite: "none",
        secure: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
        sameSite: "none",
        secure: true,
      });

      res.status(200).json(hospital);
    } catch (error) {
      return next(err);
    }
  },
};
module.exports = loginController;
