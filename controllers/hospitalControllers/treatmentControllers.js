const Hospital = require("../../models/Hospital");
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
  async getTreatments(req,res,next){
    const hospitalId = req.hospital._id;
    if (!hospitalId) {
      next(CustomErrorHandler.missingFields());
    }
    try{
        const hospital = await Hospital.findById(hospitalId).populate('treatments');
        if(!hospital){
            return next(CustomErrorHandler.notFound('Hospital not found in our Database'))
        }
        res.status(200).json({doctors: hospital.treatments});
    }catch(error){
        next(error);
    }
  },

  async updateDescription(req,res,next){
    const {treatmentId} = req.params;
    const hospitalId = req.hospital._id;
    const {description} = req.body;
    if(!description || !treatmentId || !hospitalId ) return next(CustomErrorHandler.missingFields());

    try{
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return next(CustomErrorHandler.notFound('Hospital not found in our Database'))
        }

        const searchTreatmentId = hospital.treatments.find(element => element == treatmentId);
        const isTreatmentExist = searchTreatmentId === treatmentId;

        if(!isTreatmentExist){
            return next(CustomErrorHandler.notFound('Treatment not Found'));
        }


        const treatment = await Treatment.findById(treatmentId);
        if(!treatment){
            return next(CustomErrorHandler.notFound('Treatment not Found'));
        }

        treatment.description = description;
        await treatment.save(); 

        return res.status(200).json("treatment description updated");

    }catch(error){
        next(error)
    }
  },

  async updatePrice(req,res,next){
    const {treatmentId} = req.params;
    const hospitalId = req.hospital._id;
    const {price} = req.body;
    if(!price || !treatmentId || !hospitalId ) return next(CustomErrorHandler.missingFields());

    try{
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return next(CustomErrorHandler.notFound('Hospital not found in our Database'))
        }

        const searchTreatmentId = hospital.treatments.find(element => element == treatmentId);
        const isTreatmentExist = searchTreatmentId === treatmentId;

        if(!isTreatmentExist){
            return next(CustomErrorHandler.notFound('Treatment not Found'));
        }


        const treatment = await Treatment.findById(treatmentId);
        if(!treatment){
            return next(CustomErrorHandler.notFound('Treatment not Found'));
        }

        treatment.price = Number(price);
        await treatment.save(); 

        return res.status(200).json("treatment price updated");

    }catch(error){
        next(error)
    }
  },

  async updateName(req,res,next){
    const {treatmentId} = req.params;
    const hospitalId = req.hospital._id;
    const {name} = req.body;
    if(!name || !treatmentId || !hospitalId ) return next(CustomErrorHandler.missingFields());

    try{
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return next(CustomErrorHandler.notFound('Hospital not found in our Database'))
        }

        const searchTreatmentId = hospital.treatments.find(element => element == treatmentId);
        const isTreatmentExist = searchTreatmentId === treatmentId;

        if(!isTreatmentExist){
            return next(CustomErrorHandler.notFound('Treatment not Found'));
        }


        const treatment = await Treatment.findById(treatmentId);
        if(!treatment){
            return next(CustomErrorHandler.notFound('Treatment not Found'));
        }

        treatment.name = name;
        await treatment.save(); 

        return res.status(200).json("treatment name updated");

    }catch(error){
        next(error)
    }
  },
  
  async updateDuration(req,res,next){
    const {treatmentId} = req.params;
    const hospitalId = req.hospital._id;
    const {duration} = req.body;
    if(!duration || !treatmentId || !hospitalId ) return next(CustomErrorHandler.missingFields());

    try{
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return next(CustomErrorHandler.notFound('Hospital not found in our Database'))
        }

        const searchTreatmentId = hospital.treatments.find(element => element == treatmentId);
        const isTreatmentExist = searchTreatmentId === treatmentId;

        if(!isTreatmentExist){
            return next(CustomErrorHandler.notFound('Treatment not Found'));
        }


        const treatment = await Treatment.findById(treatmentId);
        if(!treatment){
            return next(CustomErrorHandler.notFound('Treatment not Found'));
        }

        treatment.duration = duration;
        await treatment.save(); 

        return res.status(200).json("treatment duration updated");

    }catch(error){
        next(error)
    }
  }
};
module.exports = treatmentControllers;
