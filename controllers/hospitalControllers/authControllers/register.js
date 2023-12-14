const hashServices = require("../../../services/hashServices");
const {
  createHospital,
} = require("../../../services/hospitalServices/createHospital");
const getHospitalServices = require("../../../services/hospitalServices/getHospitalServices");
const refreshHospitalServices = require("../../../services/hospitalServices/refreshHospitalServices");
const tokenServices = require("../../../services/tokenServices");
const CustomErrorHandler = require("../../../utils/CustomErrorHandler");

const registerController = {
  async register(req, res, next) {
    const {
      name,
      contactEmail,
      ContactNumber,
      state,
      city,
      location,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !contactEmail ||
      !ContactNumber ||
      !state ||
      !city ||
      !location ||
      !email ||
      !password
    ) {
      return next(CustomErrorHandler.missingFields());
    }

    try {
      const existHospital = await getHospitalServices.getByEmail(email);
      console.log(existHospital);

      if (existHospital) {
        return next(
          CustomErrorHandler.alreadyExist("This email has been already taken")
        );
      }

      const hashedPassword = hashServices.hashPassword(password);
      const hospital = await createHospital(req.body, hashedPassword);

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
module.exports = registerController;
