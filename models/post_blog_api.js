const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const post_blog = sequelize.define('post_blog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    authorName: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'table_resto', 
    timestamps: true,
});

module.exports = post_blog;