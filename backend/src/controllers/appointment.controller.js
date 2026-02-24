const { Appointment, Client, Barber, Service, User } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            include: [
                { model: Client, as: 'client' },
                { model: Service, as: 'service' },
                { model: Barber, as: 'barber', include: [{ model: User, attributes: ['name'] }] },
            ],
            order: [['date', 'ASC'], ['time_slot', 'ASC']],
        });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener turnos', error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                { model: Client, as: 'client' },
                { model: Service, as: 'service' },
                { model: Barber, as: 'barber', include: [{ model: User, attributes: ['name'] }] },
            ],
        });
        if (!appointment) return res.status(404).json({ message: 'Turno no encontrado' });
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener turno', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { client_id, barber_id, service_id, date, time_slot, notes } = req.body;
        // Check for conflicts
        const conflict = await Appointment.findOne({
            where: { barber_id, date, time_slot, status: ['pending', 'confirmed'] },
        });
        if (conflict) return res.status(409).json({ message: 'Ese horario ya está reservado' });

        const appointment = await Appointment.create({ client_id, barber_id, service_id, date, time_slot, notes });
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear turno', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Turno no encontrado' });
        await appointment.update(req.body);
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar turno', error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Turno no encontrado' });
        await appointment.destroy();
        res.json({ message: 'Turno eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar turno', error: err.message });
    }
};
