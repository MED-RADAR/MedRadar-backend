const getHospitalServices = require("../../services/hospitalServices/getHospitalServices");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");

const facilitiesControllers = {
  async addFacilities(req, res, next) {
    try {
      const { facilities } = req.body;
      const hospitalId = req.hospital._id;
      const hospital = await getHospitalServices.getById(hospitalId);
      if (!hospital) {
        next(CustomErrorHandler.notFound("Hospital not Found"));
      }

      if (hospital.facilities.length === 0) {
        hospital.facilities = facilities;
        await hospital.save();
      } else {
        const existingFacilities = hospital.facilities;
        const updatedFacilities = [...existingFacilities, ...facilities];
        hospital.facilities = updatedFacilities;
        await hospital.save();
      }
      const message = facilities.length === 0 ? "Facility" : "Facilities";
      res.status(200).json(`${message} updated`);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = facilitiesControllers;
