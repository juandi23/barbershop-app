const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    duration_min: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 30 },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { tableName: 'services', timestamps: true });

module.exports = Service;
