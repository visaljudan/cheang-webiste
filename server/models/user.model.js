import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nameuser: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    Request: { type: Boolean, default: false },
    Confirm: { type: Boolean, default: false },
    userPro: { type: Boolean, default: false },
    brandName: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    typeService: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
