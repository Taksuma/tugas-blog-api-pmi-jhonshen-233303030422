// models/user.js
const { DataTypes } = require('sequelize'); // Untuk mendefinisikan tipe data kolom
const { sequelize } = require('../config/database'); // Mengimpor instance sequelize
const bcrypt = require('bcrypt'); // Untuk mengenkripsi password

// Mendefinisikan model 'User' yang akan menjadi tabel 'users' di database
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,    // Tipe data integer
        primaryKey: true,           // Ini adalah primary key (kunci unik untuk setiap baris)
        autoIncrement: true,        // Nilai akan otomatis bertambah
        allowNull: false,           // Tidak boleh kosong
    },
    username: {
        type: DataTypes.STRING,     // Tipe data string (teks pendek)
        unique: true,               // Setiap username harus unik
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,     // Tipe data string (akan menyimpan password terenkripsi)
        allowNull: false,
    },
}, {
    tableName: 'users', // Nama tabel sebenarnya di database akan menjadi 'users'
    timestamps: true,   // Otomatis menambahkan kolom 'createdAt' dan 'updatedAt'
    hooks: {            // Hooks adalah fungsi yang berjalan sebelum/sesudah operasi database
        beforeCreate: async (user) => { // Sebelum user baru dibuat
            const salt = await bcrypt.genSalt(10); // Membuat "garam" acak untuk enkripsi
            user.password = await bcrypt.hash(user.password, salt); // Enkripsi password
        },
        beforeUpdate: async (user) => { // Sebelum user diperbarui
            if (user.changed('password')) { // Jika password berubah
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
});

// Menambahkan metode untuk membandingkan password saat login
User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // Membandingkan password yang diinput dengan yang terenkripsi
};

module.exports = User; // Mengekspor model User