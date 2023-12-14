const Hospital = require("../../models/Hospital");

class GetHospitalServices {
  async getByEmail(email) {
    return await Hospital.findOne({ email: email });
  }
  async getById(id) {
    return await Hospital.findById(id);
  }
}

module.exports = new GetHospitalServices();
