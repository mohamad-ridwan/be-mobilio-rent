const carsDB = require("../models/cars");
const { v4: uuidv4 } = require("uuid");

exports.listCars = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Halaman saat ini (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Jumlah item per halaman (default: 10)
    const skip = (page - 1) * limit; // Jumlah data yang dilewati

    // Mengambil data mobil sesuai dengan halaman dan batasan
    const cars = await carsDB.find().skip(skip).limit(limit);

    // Menghitung total jumlah mobil untuk keperluan informasi pagination
    const totalCars = await carsDB.countDocuments();
    const totalPages = Math.ceil(totalCars / limit);

    // Mengirim respons sukses dengan daftar mobil dan informasi pagination
    res.status(200).json({
      message: "Daftar mobil berhasil diambil.",
      data: cars,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        pageSize: limit,
        totalItems: totalCars,
      },
    });
  } catch (error) {
    console.error(
      "Error saat mengambil daftar mobil dengan pagination:",
      error
    );
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil daftar mobil.",
      error: error.message,
    });
    next(error);
  }
};

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
