// app.js
const express = require('express'); // Mengimpor Express
const bodyParser = require('body-parser'); // Middleware untuk parsing body request
const { connectDB } = require('./config/database'); // Mengimpor fungsi koneksi DB
const db = require('./models'); // Mengimpor semua model (ini juga akan menjalankan sinkronisasi DB)
const authRoutes = require('./routes/authRoutes'); // Mengimpor route autentikasi
const myBlogPostRoutes = require('./routes/postRoutes_blog_api'); // <-- Mengimpor route blogmu (sesuaikan namanya)
require('dotenv').config(); // Memuat variabel dari .env

const app = express(); // Membuat instance aplikasi Express
const PORT = process.env.PORT || 5000; // Mengambil port dari .env, default 5000

// Middleware
app.use(bodyParser.json()); // Memungkinkan Express membaca body request dalam format JSON

// Koneksi ke database
connectDB();

// Menggunakan Routes
app.use('/api/auth', authRoutes); // Menggunakan route autentikasi di prefix /api/auth
app.use('/api/post_blog_api', myBlogPostRoutes); // <-- Menggunakan route blogmu di prefix /api/my-blog-posts (ubah ini!)

// Route dasar (hanya untuk memastikan server berjalan)
app.get('/', (req, res) => {
    res.send('Selamat datang di API JWT Blog Mikro Anda!');
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});