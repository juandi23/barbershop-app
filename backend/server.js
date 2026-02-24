require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { sequelize } = require('./src/models');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',         require('./src/routes/auth.routes'));
app.use('/api/appointments', require('./src/routes/appointment.routes'));
app.use('/api/barbers',      require('./src/routes/barber.routes'));
app.use('/api/services',     require('./src/routes/service.routes'));
app.use('/api/clients',      require('./src/routes/client.routes'));

// Health check
app.get('/', (req, res) => res.json({ message: 'Barbershop API running ✂️' }));

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database connected and synced');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ DB connection error:', err));
