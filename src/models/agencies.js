const mongoose = require("mongoose");

const agenciesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    address: {
      street: { type: String },
      district: { type: String },
      city: { type: String },
      province: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      unique: true, // Tambahkan unique untuk email juga
      lowercase: true, // Simpan email dalam huruf kecil
    },
    establishedYear: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Agencies = mongoose.model("agencies", agenciesSchema);

module.exports = Agencies;
