const mongoose = require("mongoose");

module.exports.userRoleEnums = {
    admin: 1,
    customer: 2
}

const otpSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  otp: {
      type: String,
      required: true,
  },
  expireAt: {
    type: Number,
    default: Date.now()+1800000,
  }
},
{ timestamps: true }
);

const otpModel = mongoose.model('otp', otpSchema);

module.exports = otpModel;