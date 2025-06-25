// models/index.js
const { sequelize } = require('../config/database'); // Mengimpor instance sequelize
const User = require('./user'); // Mengimpor model User
const MyBlogPost = require('./my_blog_post'); // <-- Mengimpor model blogmu (sesuaikan nama filenya)

// Di sini kita bisa mendefinisikan hubungan antar model (jika ada, seperti 1 user punya banyak post)
// Contoh:
// User.hasMany(MyBlogPost, { foreignKey: 'userId', as: 'posts' });
// MyBlogPost.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const db = {}; // Membuat objek db untuk menyimpan semua model dan instance sequelize
db.sequelize = sequelize;
db.User = User;
db.MyBlogPost = MyBlogPost; // <-- Sesuaikan nama ini dengan nama model blogmu

// Sinkronkan semua model dengan database
// sequelize.sync() akan membuat tabel jika belum ada berdasarkan definisi model
// { alter: true } akan mencoba mengubah tabel yang ada agar cocok dengan model, tanpa menghapus data yang sudah ada.
// HATI-HATI dengan { force: true } karena akan menghapus tabel dan membuat ulang (data akan hilang!)
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tabel berhasil disinkronkan!');
    })
    .catch(err => {
        console.error('Gagal sinkronisasi database:', err);
    });

module.exports = db; // Mengekspor objek db