const express = require("express");
const clienteRouter = require("./clienteRouter");
const associadoRouter = require("./associadoRouter");
const motoboyRouter = require("./motoboyRouter");
const entregaRouter = require("./entregaRouter");
const clienteAssociadoRouter = require("./clienteAssociadoRouter");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("It's working");
});

router.use("/clienteRouter", clienteRouter);
router.use("/associadoRouter", associadoRouter);
router.use("/motoboy", motoboyRouter);
router.use("/entregaRouter", entregaRouter);
router.use("/clienteAssociadoRouter", clienteAssociadoRouter);

module.exports = router;
