const express = require('express');
const { authAssociado, auth } = require('../middlewares/authMiddleware');
const motoboyController = require('../controllers/motoboyController');
const router = express.Router();

router.post('/auth', motoboyController.autenticar);
router.post('/', authAssociado, motoboyController.cadastrarMotoboy);
router.get('/', authAssociado, motoboyController.listarTodosMotoboys);
router.get('/:cpf', auth, motoboyController.buscarMotoboyPorCpf);
router.put('/:cpf', auth, motoboyController.editarPorCpf);
router.delete('/:cpf', authAssociado, motoboyController.removerMotoboy);

module.exports = router;

