const Hospital = require("../../models/Hospital");

class createHospitalServices {
  async createHospital(data, hashedPassword) {
    const { name, contactEmail, ContactNumber, state, city, location, email } =
      data;

    return await Hospital.create({
      name,
      email,
      password: hashedPassword,
      contact: {
        phone: ContactNumber,
        email: contactEmail,
      },
      address: {
        state: state,
        city: city,
        location: location,
      },
    });
  }
}

module.exports = new createHospitalServices();
