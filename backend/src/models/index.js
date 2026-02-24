const sequelize = require('../config/database');
const User = require('./User');
const Client = require('./Client');
const Barber = require('./Barber');
const Service = require('./Service');
const Appointment = require('./Appointment');

// Associations
Barber.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Barber, { foreignKey: 'user_id' });

Appointment.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });
Appointment.belongsTo(Barber, { foreignKey: 'barber_id', as: 'barber' });
Appointment.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });

Client.hasMany(Appointment, { foreignKey: 'client_id' });
Barber.hasMany(Appointment, { foreignKey: 'barber_id' });
Service.hasMany(Appointment, { foreignKey: 'service_id' });

module.exports = { sequelize, User, Client, Barber, Service, Appointment };
