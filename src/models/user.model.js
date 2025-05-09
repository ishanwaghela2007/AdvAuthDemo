import mongoose from "mongoose";

const userscheme = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: {
    type: String,
    default: null,
  },
  forgotPasswordTokenExpiry: {
    type: Date,
    default: null,
  },
  verifytoken: {
    type: String,
    default: null,
  },
  verifyTokenExpiry: {
    type: Date,
    default: null,
  },
});

const User = mongoose.models.user || mongoose.model("user", userscheme);

export default User;
