const express = require("express");
const clienteRouter = require("./clienteRouter");
const associadoRouter = require("./associadoRouter");
const motoboyRouter = require("./motoboyRouter");
const entregaRouter = require("./entregaRouter");

const router = express.Router();

router.use("/associado", associadoRouter);
router.use("/cliente", clienteRouter);
router.use("/motoboy", motoboyRouter);
router.use("/entrega", entregaRouter);

router.all("*", (req, res) => res.status(404).json({ message: 'Não encontrado' }))

module.exports = router;
