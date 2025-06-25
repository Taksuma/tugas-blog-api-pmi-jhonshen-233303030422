const express = require('express');
const router = express.Router();
const myBlogPostController = require('../controllers/post_controller_blog_api');
const { verifyToken } = require('../middleware/authMiddleware'); 
router.post('/', verifyToken, myBlogPostController.createPost);
router.get('/', verifyToken, myBlogPostController.getAllPosts);
router.get('/:id', verifyToken, myBlogPostController.getPostById);
router.put('/:id', verifyToken, myBlogPostController.updatePost);
router.delete('/:id', verifyToken, myBlogPostController.deletePost);

module.exports = router;