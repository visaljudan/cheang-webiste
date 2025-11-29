import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://static-00.iconduck.com/assets.00/wrench-icon-2047x2048-jyerjpd9.png",
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Serivce = mongoose.model("Serivce", serviceSchema);

export default Serivce;
