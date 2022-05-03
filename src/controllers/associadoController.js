const { ResultType } = require('../helpers/result');
const associadoService = require('../services/associadoService');

async function cadastrarAssociado(req, res) {
  const { data, result, message } = await associadoService.cadastrarAssociado(req.body);
  if (result === ResultType.Fail) return res.status(400).json({ message, details: data });
  return res.json(data);
}

async function listarTodosAssociados(_, res) {
  const { data, result, message } = await associadoService.listarTodosAssociados();
  if (result === ResultType.Fail) return res.status(500).json({ message, datails: data });
  return res.json(data);
}

async function buscarAssociadoPorNome(req, res) {
  const { data, result, message } = await associadoService.buscarAssociadoPorNome(req.params.nome);
  if (result === ResultType.Fail) return res.status(404).json({ message, details: data });
  return res.json(data);
}

async function editarPorCnpj(req, res) {
  const cnpj = req.params.cnpj;
  const associado = req.body;

  const { data: { notFound, ...data }, result, message } = await associadoService.editarPorCnpj(cnpj, associado);

  if (result === ResultType.Fail)
    return res.status(notFound ? 404 : 400).json({ message, details: data });

  return res.json(data);
}

async function removerAssociado(req, res) {
  const cnpj = req.params.cnpj;

  const { data: { notFound, ...data }, result, message } = await associadoService.removerAssociado(cnpj);
  if (result === ResultType.Fail) return res.status(notFound ? 404 : 400).json({ message, data });
  return res.status(204).json();
}

async function autenticar(req, res) {
  const { cnpj, senha } = req.body;
  const { data, result, message } = await associadoService.autenticar(cnpj, senha);
  if (result == ResultType.Fail) return res.status(400).json({ message, details: data });
  return res.json(data);
}

module.exports = {
  cadastrarAssociado,
  listarTodosAssociados,
  buscarAssociadoPorNome,
  editarPorCnpj,
  removerAssociado,
  autenticar
};
