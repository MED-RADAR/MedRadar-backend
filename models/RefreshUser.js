const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refreshUserSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RefreshUser", refreshUserSchema);
