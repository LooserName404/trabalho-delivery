const express = require("express");
const clienteController = require('../controllers/clienteController');
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/', authMiddleware({ associado: true }), clienteController.cadastrarCliente)
router.post('/associar', authMiddleware({ associado: true }), clienteController.associarCliente)

module.exports = router;
