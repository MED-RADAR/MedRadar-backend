const CustomErrorHandler = require("../utils/CustomErrorHandler");
const tokenServices = require("../services/tokenServices");
async function authHospitalMiddleware(req, res, next) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return next(CustomErrorHandler.invalidToken());
    }
    const hospitalData = await tokenServices.verifyAccessToken(accessToken);
    if (!hospitalData) {
      return next(CustomErrorHandler.invalidToken());
    }
    // if (!hospitalData || !hospitalData.approved) {
    //   return next(CustomErrorHandler.invalidToken());
    // }
    req.hospital = hospitalData;
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = authHospitalMiddleware;
