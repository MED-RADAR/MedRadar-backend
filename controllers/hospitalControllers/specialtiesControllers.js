const getHospitalServices = require("../../services/hospitalServices/getHospitalServices");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");

const specialtiesControllers = {
  async addSpecialties(req, res, next) {
    try {
      const { specialties } = req.body;
      const hospitalId = req.hospital._id;
      const hospital = await getHospitalServices.getById(hospitalId);
      if (!hospital) {
        next(CustomErrorHandler.notFound("Hospital not Found"));
      }

      if (hospital.specialties.length === 0) {
        hospital.specialties = specialties;
        await hospital.save();
      } else {
        const existingSpecialties = hospital.specialties;
        const updatedSpecialties = [...existingSpecialties, ...specialties];
        hospital.specialties = updatedSpecialties;
        await hospital.save();
      }
      const message = specialties.length === 0 ? "Specialty" : "Specialties";
      res.status(200).json(`${message} updated`);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = specialtiesControllers;
