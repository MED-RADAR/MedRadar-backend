const Doctor = require("../../models/Doctor");
const Hospital = require("../../models/Hospital");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");

const doctorControllers = {
  async addDoctor(req, res, next) {
    const { name, specialty, yearsOfExperience } = req.body;
    const hospitalId = req.hospital._id;
    if (!name || !specialty || !yearsOfExperience || !hospitalId) {
      next(CustomErrorHandler.missingFields());
    }
    try {
        const doctor = await Doctor.create({
            name,
            specialty,
            yearsOfExperience
        });

        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return next(CustomErrorHandler.notFound('Hospital not found in our Database'))
        }
        hospital.doctors.unshift(doctor._id);
        await hospital.save();
        res.status(200).json(`Dr.${name} added`);
    } catch (error) {
      return next(error);
    }
  },

  async getDoctors(req,res,next){
    const hospitalId = req.hospital._id;
    if (!hospitalId) {
      next(CustomErrorHandler.missingFields());
    }
    try{
        const hospital = await Hospital.findById(hospitalId).populate('doctors');
        if(!hospital){
            return next(CustomErrorHandler.notFound('Hospital not found in our Database'))
        }
        res.status(200).json({doctors: hospital.doctors});
    }catch(error){
        next(error);
    }
  },

  async addAchievement(req,res,next){
    const {doctorId} = req.params;
    const hospitalId = req.hospital._id;
    const {achievement} = req.body;
    if(!achievement || !doctorId || !hospitalId ) return next(CustomErrorHandler.missingFields());

    try{
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return next(CustomErrorHandler.notFound('Hospital not found in our Database'))
        }

        const searchDoctorId = hospital.doctors.find(element => element == doctorId);
        const isDoctorExist = searchDoctorId === doctorId;

        if(!isDoctorExist){
            return next(CustomErrorHandler.notFound('Doctor not Found'));
        }


        const doctor = await Doctor.findById(doctorId);
        if(!doctor){
            return next(CustomErrorHandler.notFound('Doctor not Found'));
        }

        doctor.achievements.unshift(achievement);
        await doctor.save(); 

        return res.status(200).json("achievements added");

    }catch(error){
        next(error)
    }
  },

  async updateYOE(req,res,next){
    const {doctorId} = req.params;
    const hospitalId = req.hospital._id;
    const {yearsOfExperience} = req.body;
    if(!yearsOfExperience || !doctorId || !hospitalId ) return next(CustomErrorHandler.missingFields());

    try{
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return next(CustomErrorHandler.notFound('Hospital not found in our Database'))
        }

        const searchDoctorId = hospital.doctors.find(element => element == doctorId);
        const isDoctorExist = searchDoctorId === doctorId;

        if(!isDoctorExist){
            return next(CustomErrorHandler.notFound('Doctor not Found'));
        }


        const doctor = await Doctor.findById(doctorId);
        if(!doctor){
            return next(CustomErrorHandler.notFound('Doctor not Found'));
        }

        doctor.yearsOfExperience = yearsOfExperience;
        await doctor.save(); 

        return res.status(200).json("years of Experience updated");

    }catch(error){
        next(error)
    }
  },

  async updateName(req,res,next){
    const {doctorId} = req.params;
    const hospitalId = req.hospital._id;
    const {name} = req.body;
    if(!name || !doctorId || !hospitalId ) return next(CustomErrorHandler.missingFields());

    try{
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return next(CustomErrorHandler.notFound('Hospital not found in our Database'))
        }

        const searchDoctorId = hospital.doctors.find(element => element == doctorId);
        const isDoctorExist = searchDoctorId === doctorId;

        if(!isDoctorExist){
            return next(CustomErrorHandler.notFound('Doctor not Found'));
        }


        const doctor = await Doctor.findById(doctorId);
        if(!doctor){
            return next(CustomErrorHandler.notFound('Doctor not Found'));
        }

        doctor.name = name;
        await doctor.save(); 

        return res.status(200).json("name updated");

    }catch(error){
        next(error)
    }
  },
  
  async updateSpecialty(req,res,next){
    const {doctorId} = req.params;
    const hospitalId = req.hospital._id;
    const {specialty} = req.body;
    if(!specialty || !doctorId || !hospitalId ) return next(CustomErrorHandler.missingFields());

    try{
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return next(CustomErrorHandler.notFound('Hospital not found in our Database'))
        }

        const searchDoctorId = hospital.doctors.find(element => element == doctorId);
        const isDoctorExist = searchDoctorId === doctorId;

        if(!isDoctorExist){
            return next(CustomErrorHandler.notFound('Doctor not Found'));
        }

        const doctor = await Doctor.findById(doctorId);
        if(!doctor){
            return next(CustomErrorHandler.notFound('Doctor not Found'));
        }

        doctor.specialty = specialty;
        await doctor.save(); 

        return res.status(200).json("specialty updated");

    }catch(error){
        next(error)
    }
  }

};

module.exports = doctorControllers;