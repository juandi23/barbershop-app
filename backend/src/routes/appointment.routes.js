const router = require('express').Router();
const ctrl = require('../controllers/appointment.controller');
const authMw = require('../middleware/auth');

router.get('/', authMw, ctrl.getAll);
router.get('/:id', authMw, ctrl.getById);
router.post('/', ctrl.create);        // Clients can book without login
router.put('/:id', authMw, ctrl.update);
router.delete('/:id', authMw, ctrl.remove);

module.exports = router;
