const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    specialty:{
        type: String,
        required: true
    },
    achievements:{
        type: Array,
        items: {
            type: String
        }
    },
    yearsOfExperience:{
        type: Number,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
