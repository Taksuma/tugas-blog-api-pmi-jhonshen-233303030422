// controllers/my_blog_postController.js (Contoh: controllers/catatanController.js)
const { MyBlogPost } = require('../models'); // <-- Mengimpor model blogmu

// 1. Membuat Post Baru (CREATE)
exports.createPost = async (req, res) => {
    try {
        const { title, content, authorName } = req.body; // Ambil data dari body request
        // req.user.id ini didapat dari middleware verifyToken setelah token terverifikasi
        // Jika ingin menyimpan siapa yang membuat post: const newPost = await MyBlogPost.create({ title, content, authorName, userId: req.user.id });
        const newPost = await MyBlogPost.create({ title, content, authorName });
        res.status(201).json({ message: 'Post berhasil dibuat', post: newPost });
    } catch (error) {
        console.error('Error saat membuat post:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

// 2. Mendapatkan Semua Post (READ All)
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await MyBlogPost.findAll(); // Mengambil semua data dari tabel blogmu
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error saat mengambil semua post:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

// 3. Mendapatkan Post Berdasarkan ID (READ One)
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params; // Ambil ID dari parameter URL
        const post = await MyBlogPost.findByPk(id); // Mencari post berdasarkan Primary Key (ID)
        if (!post) {
            return res.status(404).json({ message: 'Post tidak ditemukan.' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error saat mengambil post berdasarkan ID:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

// 4. Memperbarui Post (UPDATE)
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, authorName } = req.body;

        const post = await MyBlogPost.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post tidak ditemukan.' });
        }

        // Opsional: Jika ingin memastikan hanya pemilik yang bisa update
        // if (post.userId !== req.user.id) {
        //     return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengedit post ini.' });
        // }

        post.title = title;       // Perbarui judul
        post.content = content;   // Perbarui konten
        post.authorName = authorName; // Perbarui author
        await post.save();        // Simpan perubahan ke database

        res.status(200).json({ message: 'Post berhasil diperbarui', post });
    } catch (error) {
        console.error('Error saat memperbarui post:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

// 5. Menghapus Post (DELETE)
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await MyBlogPost.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post tidak ditemukan.' });
        }

        // Opsional: Jika ingin memastikan hanya pemilik yang bisa menghapus
        // if (post.userId !== req.user.id) {
        //     return res.status(403).json({ message: 'Anda tidak memiliki izin untuk menghapus post ini.' });
        // }

        await post.destroy(); // Hapus post dari database
        res.status(200).json({ message: 'Post berhasil dihapus.' });
    } catch (error) {
        console.error('Error saat menghapus post:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};