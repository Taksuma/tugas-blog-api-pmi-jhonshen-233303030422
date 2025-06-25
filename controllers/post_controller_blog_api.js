const { post_blog } = require('../models'); 
exports.createPost = async (req, res) => {
    try {
        const { title, content, authorName } = req.body;
        const newPost = await post_blog.create({ title, content, authorName }); 
        res.status(201).json({ message: 'Post berhasil dibuat', post: newPost });
    } catch (error) {
        console.error('Error saat membuat post:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await post_blog.findAll(); 
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error saat mengambil semua post:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await post_blog.findByPk(id); 
        if (!post) {
            return res.status(404).json({ message: 'Post tidak ditemukan.' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error saat mengambil post berdasarkan ID:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, authorName } = req.body;

        const post = await post_blog.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post tidak ditemukan.' });
        }

        post.title = title;
        post.content = content;
        post.authorName = authorName;
        await post.save();

        res.status(200).json({ message: 'Post berhasil diperbarui', post });
    } catch (error) {
        console.error('Error saat memperbarui post:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await post_blog.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post tidak ditemukan.' });
        }

        await post.destroy();
        res.status(200).json({ message: 'Post berhasil dihapus.' });
    } catch (error) {
        console.error('Error saat menghapus post:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};