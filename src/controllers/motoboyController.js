const { ResultType } = require('../helpers/result');
const motoboyService = require('../services/motoboyService');

async function cadastrarMotoboy(req, res) {
  const motoboy = req.body;
  const { data, result, message } = await motoboyService.cadastrarMotoboy(motoboy);
  if (result === ResultType.Fail) return res.status(400).json({ message, details: data });
  return res.json(data);
}

async function listarTodosMotoboys(_, res) {
  const { data, result, message } = await motoboyService.listarTodosMotoboys();
  if (result === ResultType.Fail) return res.status(500).json({ message, datails: data });
  return res.json(data);
}

async function buscarMotoboyPorCpf(req, res) {
  const { data, result, message } = await motoboyService.buscarMotoboyPorCpf(req.params.cpf);
  if (result === ResultType.Fail) return res.status(404).json({ message, details: data });
  return res.json(data);
}

async function editarPorCpf(req, res) {
  const cpf = req.params.cpf;
  const motoboy = req.body;

  const { data: { notFound, ...data }, result, message } = await motoboyService.editarPorCpf(cpf, motoboy);

  if (result === ResultType.Fail)
    return res.status(notFound ? 404 : 400).json({ message, details: data });

  return res.json(data);
}

async function removerMotoboy(req, res) {
  const cpf = req.params.cpf;

  const { data: { notFound, ...data }, result, message } = await motoboyService.removerMotoboy(cpf);
  if (result === ResultType.Fail) return res.status(notFound ? 404 : 400).json({ message, data });
  return res.status(204).json();
}

async function autenticar(req, res) {
  const { cpf, senha } = req.body;
  const { data, result, message } = await motoboyService.autenticar(cpf, senha);
  if (result == ResultType.Fail) return res.status(400).json({ message, details: data });
  return res.json(data);
}

module.exports = {
  cadastrarMotoboy,
  listarTodosMotoboys,
  buscarMotoboyPorCpf,
  editarPorCpf,
  removerMotoboy,
  autenticar
};
