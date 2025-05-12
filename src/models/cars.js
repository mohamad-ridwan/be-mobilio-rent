const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    id: {
      type: String,
      unique: true, // Menambahkan unique constraint untuk memastikan tidak ada ID yang sama
    },
    agencyId: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true, // Menandakan bahwa field ini wajib diisi
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    capacity: {
      type: Number,
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual"], // Membatasi nilai yang diterima hanya 'Automatic' atau 'Manual'
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol"], // Saat ini hanya menerima 'Petrol'
      required: true,
    },
    rentalPricePerDay: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true, // Set nilai default menjadi true
    },
    features: {
      type: [String], // Array of strings
    },
    imageUrl: {
      type: String,
      default: null, // Set nilai default menjadi null
    },
  },
  {
    timestamps: true, // Mengaktifkan createdAt dan updatedAt fields
  }
);

module.exports = mongoose.model("cars", carSchema);
