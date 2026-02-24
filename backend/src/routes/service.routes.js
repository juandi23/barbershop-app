const router = require('express').Router();
const ctrl = require('../controllers/service.controller');
const authMw = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', authMw, ctrl.create);
router.put('/:id', authMw, ctrl.update);
router.delete('/:id', authMw, ctrl.remove);

module.exports = router;
