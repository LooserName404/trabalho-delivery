const express = require('express');
const { authAssociado, auth } = require('../middlewares/authMiddleware');
const entregaController = require('../controllers/entregaController');
const router = express.Router();

router.post('/', authAssociado, entregaController.cadastrarEntrega);
router.get('/', auth, entregaController.listarTodasEntregas);
router.get('/finalizadas', auth, entregaController.listarEntregasFinalizadas);
router.get('/pendentes', auth, entregaController.listarEntregasPendentes);
router.get('/por-motoboy', authAssociado, entregaController.listarEntregasPorMotoboy);
router.put('/:id', auth, entregaController.editarEntrega);
router.delete('/:id', authAssociado, entregaController.removerEntrega);

module.exports = router;
