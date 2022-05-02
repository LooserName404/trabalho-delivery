const express = require("express");
const clienteController = require('../controllers/clienteController');
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const auth = authMiddleware({ associado: true });

router.post('/', auth, clienteController.cadastrarCliente)
router.post('/associar', auth, clienteController.associarCliente)
router.get('/', auth, clienteController.listarClientes)
router.get('/:cnpj', auth, clienteController.buscarPorCnpj)
router.put('/:cnpj', auth, clienteController.editarPorCnpj)
router.delete('/desassociar', auth, clienteController.desassociarCliente)
router.delete('/:cnpj', auth, clienteController.deletarCliente)

module.exports = router;
