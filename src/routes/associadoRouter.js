const express = require("express")
const associadoController = require('../controllers/associadoController')
const { removeAttribute } = require("../models/Associado")
const router = express.Router()

router.post('/', associadoController.cadastrarAssociado)
router.get('/', associadoController.listarTodosAssociados)
router.get('/:nome', associadoController.buscarAssociadoPorNome)
router.post('/:cnpj', associadoController.editarPorCnpj)
router.delete('/:cnpj', associadoController.removerAssociado)

module.exports = router
