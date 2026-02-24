const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Barber = sequelize.define('Barber', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    bio: { type: DataTypes.TEXT, allowNull: true },
    photo_url: { type: DataTypes.STRING(255), allowNull: true },
}, { tableName: 'barbers', timestamps: true });

module.exports = Barber;
