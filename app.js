const express = require('express');
const bodyParser = require('body-parser'); 
const { connectDB } = require('./config/database'); 
const db = require('./models'); 
const authRoutes = require('./routes/authRoutes'); 
const myBlogPostRoutes = require('./routes/postRoutes_blog_api'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());     

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/post_blog_api', myBlogPostRoutes);
app.get('/', (req, res) => {
    res.send('Selamat datang di API JWT Blog Mikro Anda!');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});