const { Service } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener servicios', error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener servicio', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, description, duration_min, price } = req.body;
        const service = await Service.create({ name, description, duration_min, price });
        res.status(201).json(service);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear servicio', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
        await service.update(req.body);
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar servicio', error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
        await service.destroy();
        res.json({ message: 'Servicio eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar servicio', error: err.message });
    }
};
