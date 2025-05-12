const carsDB = require("../models/cars");
const { v4: uuidv4 } = require("uuid");

exports.add = async (req, res, next) => {
  try {
    const {
      agencyId,
      brand,
      model,
      year,
      capacity,
      transmission,
      fuelType,
      rentalPricePerDay,
      available,
      features,
      imageUrl,
    } = req.body;

    const newCar = new carsDB({
      id: uuidv4(),
      agencyId,
      brand,
      model,
      year,
      capacity,
      transmission,
      fuelType,
      rentalPricePerDay,
      available: available === undefined ? true : available, // Set default true jika tidak ada
      features: features || [], // Set default array kosong jika tidak ada
      imageUrl: imageUrl || null, // Set default null jika tidak ada
    });

    const savedCar = await newCar.save();

    res.status(201).json({
      message: "Mobil berhasil ditambahkan!",
      data: savedCar,
    });
  } catch (error) {
    console.error("Error saat menambahkan mobil:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat menambahkan mobil.",
      error: error.message,
    });
    next(error);
  }
};
