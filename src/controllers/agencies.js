const agenciesDB = require("../models/agencies");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email dan password wajib diisi." });
    }

    const agency = await agenciesDB.findOne({ email }).select("+password"); // Secara default, password mungkin tidak di-select, jadi kita explicit select

    if (!agency) {
      return res.status(401).json({ message: "Email tidak terdaftar." });
    }

    const isPasswordMatch = await bcrypt.compare(password, agency.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Password salah." });
    }

    // Jika email dan password cocok, buat sesi atau token (contoh JWT):
    const token = jwt.sign({ agencyId: agency._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // Ganti 'SECRET_KEY_ANDA' dengan secret key yang aman

    return res.status(200).json({
      message: "Login berhasil!",
      token,
      agency: {
        id: agency.id,
        name: agency.name,
        email: agency.email,
        // ... informasi lain yang ingin kamu kirimkan (kecuali password)
      },
    });
  } catch (error) {
    console.error("Login agency error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, address, phoneNumber, email, establishedYear, password } =
      req.body;

    // 1️⃣ Validasi input sederhana
    if (
      !name ||
      !address ||
      !phoneNumber ||
      !email ||
      !establishedYear ||
      !password
    ) {
      return res
        .status(400)
        .json({ message: "Semua field wajib diisi, termasuk password." });
    }

    // 2️⃣ Cek apakah email sudah terdaftar
    const existingAgency = await agenciesDB.findOne({ email });
    if (existingAgency) {
      return res.status(409).json({ message: "Email sudah terdaftar." });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah salt rounds

    // 4️⃣ Buat data baru dengan password yang sudah di-hash
    const newAgency = new agenciesDB({
      id: uuidv4(), // Generate UUID
      name,
      address,
      phoneNumber,
      email,
      establishedYear,
      password: hashedPassword, // Simpan password yang sudah di-hash
      isActive: true, // default aktif saat registrasi
    });

    await newAgency.save();

    // 5️⃣ Return sukses (jangan kirim password atau hash)
    return res.status(201).json({
      message: "Agency berhasil didaftarkan.",
      agency: {
        id: newAgency.id,
        name: newAgency.name,
        email: newAgency.email,
        // ... kirim field lain yang relevan, hindari mengirim password atau hash
      },
    });
  } catch (error) {
    console.error("Register agency error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};
