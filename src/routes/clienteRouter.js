const express = require("express");
const clienteController = require('../controllers/clienteController');
const { authAssociado } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', authAssociado, clienteController.cadastrarCliente)
router.post('/associar', authAssociado, clienteController.associarCliente)
router.get('/', authAssociado, clienteController.listarClientes)
router.get('/:cnpj', authAssociado, clienteController.buscarPorCnpj)
router.put('/:cnpj', authAssociado, clienteController.editarPorCnpj)
router.delete('/desassociar', authAssociado, clienteController.desassociarCliente)
router.delete('/:cnpj', authAssociado, clienteController.deletarCliente)

module.exports = router;
