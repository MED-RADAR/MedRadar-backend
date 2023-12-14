const getHospitalServices = require("../../../services/hospitalServices/getHospitalServices");
const refreshHospitalServices = require("../../../services/hospitalServices/refreshHospitalServices");
const tokenServices = require("../../../services/tokenServices");
const CustomErrorHandler = require("../../../utils/CustomErrorHandler");

const refreshController = {
  async refresh(req, res, next) {
    try {
      const { refreshToken: refreshTokenFromCookie } = req.cookies;
      if (!refreshTokenFromCookie) {
        next(CustomErrorHandler.unAuthorized());
      }
      let hospitalData = await tokenServices.verifyRefreshToken(
        refreshTokenFromCookie
      );
      let token = await refreshHospitalServices.findRefreshToken(
        hospitalData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return next(CustomErrorHandler.invalidToken());
      }

      const hospital = await getHospitalServices.getById(hospitalData._id);
      if (!hospital) {
        return next(
          CustomErrorHandler.notFound("No hospital exist with this id")
        );
      }

      const { refreshToken, accessToken } = tokenServices.generateTokens({
        _id: hospital._id,
        approved: hospital.approved,
      });

      await refreshHospitalServices.updateRefreshToken(
        hospital._id,
        refreshToken
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
      next(error);
    }
  },
};
module.exports = refreshController;
