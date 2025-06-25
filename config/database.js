// config/database.js
const { Sequelize } = require('sequelize'); // Mengimpor kelas Sequelize
require('dotenv').config(); // Memuat variabel dari .env

// Membuat instance Sequelize untuk koneksi database
const sequelize = new Sequelize(
    process.env.DB_NAME,       // Nama database (db_micro_blog)
    process.env.DB_USER,       // Username database (root)
    process.env.DB_PASSWORD,   // Password database
    {
        host: process.env.DB_HOST, // Host database (localhost)
        dialect: 'mysql',          // Jenis database yang digunakan
        logging: false,            // Jika true, akan menampilkan query SQL di konsol (bisa dinonaktifkan di produksi)
    }
);

// Fungsi untuk menguji koneksi database
const connectDB = async () => {
    try {
        await sequelize.authenticate(); // Mencoba terhubung ke database
        console.log('Koneksi ke database berhasil.');
    } catch (error) {
        console.error('Tidak dapat terhubung ke database:', error);
        process.exit(1); // Keluar dari aplikasi jika koneksi database gagal
    }
};

// Mengekspor objek sequelize dan fungsi connectDB agar bisa digunakan di file lain
module.exports = { sequelize, connectDB };