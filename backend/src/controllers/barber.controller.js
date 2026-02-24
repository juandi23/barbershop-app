const { Barber, User } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const barbers = await Barber.findAll({ include: [{ model: User, attributes: ['name', 'email'] }] });
        res.json(barbers);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener barberos', error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const barber = await Barber.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['name', 'email'] }],
        });
        if (!barber) return res.status(404).json({ message: 'Barbero no encontrado' });
        res.json(barber);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener barbero', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { user_id, bio, photo_url } = req.body;
        const barber = await Barber.create({ user_id, bio, photo_url });
        res.status(201).json(barber);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear barbero', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const barber = await Barber.findByPk(req.params.id);
        if (!barber) return res.status(404).json({ message: 'Barbero no encontrado' });
        await barber.update(req.body);
        res.json(barber);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar barbero', error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const barber = await Barber.findByPk(req.params.id);
        if (!barber) return res.status(404).json({ message: 'Barbero no encontrado' });
        await barber.destroy();
        res.json({ message: 'Barbero eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar barbero', error: err.message });
    }
};
