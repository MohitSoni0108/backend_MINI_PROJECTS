import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    age: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["saving", "current"],
      default: "saving",
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;