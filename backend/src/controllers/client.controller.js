const { Client } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener clientes', error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.json(client);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener cliente', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const client = await Client.create({ name, email, phone });
        res.status(201).json(client);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear cliente', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });
        await client.update(req.body);
        res.json(client);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar cliente', error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });
        await client.destroy();
        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar cliente', error: err.message });
    }
};
