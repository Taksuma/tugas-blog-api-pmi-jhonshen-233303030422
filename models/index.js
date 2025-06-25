const { sequelize } = require('../config/database');
const User = require('./user');
const post_blog = require('./post_blog_api');
const db = {};
db.sequelize = sequelize;
db.User = User;
db.post_blog = post_blog;

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tabel berhasil disinkronkan!');
    })
    .catch(err => {
        console.error('Gagal sinkronisasi database:', err);
    });

module.exports = db;