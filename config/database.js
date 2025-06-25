const { Sequelize } = require('sequelize'); 
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,       
    process.env.DB_USER,       
    process.env.DB_PASSWORD,   
    {
        host: process.env.DB_HOST, 
        dialect: 'mysql',          
        logging: false,            
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate(); 
        console.log('Koneksi ke database berhasil.');
    } catch (error) {
        console.error('Tidak dapat terhubung ke database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };