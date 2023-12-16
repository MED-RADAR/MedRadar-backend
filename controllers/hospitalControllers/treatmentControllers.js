const Treatment = require("../../models/Treatment");
const getHospitalServices = require("../../services/hospitalServices/getHospitalServices");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");
const treatmentControllers = {
  async addTreatment(req, res, next) {
    try {
      const { name, description, price, duration } = req.body;
      const hospitalId = req.hospital._id;
      const hospital = await getHospitalServices.getById(hospitalId);
      if (!hospital)
        return next(CustomErrorHandler.notFound("Hospital not found"));

      const treatment = await Treatment.create({
        name,
        description,
        price,
        duration,
      });
      
      hospital.treatments.push(treatment._id);
      await hospital.save();
      res.status(200).json("Treatment details added");
    } catch (error) {
      next(error);
    }
  },
};
module.exports = treatmentControllers;
