const express = require('express');
const associadoController = require('../controllers/associadoController');
const router = express.Router();

router.post('/auth', associadoController.autenticar);
router.post('/', associadoController.cadastrarAssociado);
router.get('/', associadoController.listarTodosAssociados);
router.get('/:nome', associadoController.buscarAssociadoPorNome);
router.put('/:cnpj', associadoController.editarPorCnpj);
router.delete('/:cnpj', associadoController.removerAssociado);

module.exports = router;
