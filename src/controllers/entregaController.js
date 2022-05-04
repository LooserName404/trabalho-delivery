const isNullOrUndefined = require('../helpers/isNullOrUndefined');
const { ResultType } = require('../helpers/result');
const entregaService = require('../services/entregaService');

function motoboyOuAssociadoIdFunc(req, funcMotoboy, funcAssociado) {
  return !isNullOrUndefined(req.associado)
    ? () => funcAssociado(req.associado.id)
    : () => funcMotoboy(req.motoboy.id);
}

async function cadastrarEntrega(req, res) {
  const id_associado = req.associado.id;
  const { data, result, message } = await entregaService.cadastrarEntrega(id_associado, req.body);
  if (result === ResultType.Fail) return res.status(400).json({ message, details: data });
  return res.json(data);
}

async function listarTodasEntregas(req, res) {
  const listar = motoboyOuAssociadoIdFunc(req, entregaService.listarTodasEntregasMotoboy, entregaService.listarTodasEntregasAssociado);

  const { data, result, message } = await listar();
  if (result === ResultType.Fail) return res.status(500).json({ message, datails: data });
  return res.json(data);
}

async function listarEntregasFinalizadas(req, res) {
  const listar = motoboyOuAssociadoIdFunc(req, entregaService.listarEntregasFinalizadasMotoboy, entregaService.listarEntregasFinalizadasAssociado);

  const { data, result, message } = await listar();
  if (result === ResultType.Fail) return res.status(500).json({ message, datails: data });
  return res.json(data);
}

async function listarEntregasPendentes(req, res) {
  const listar = motoboyOuAssociadoIdFunc(req, entregaService.listarEntregasPendentesMotoboy, entregaService.listarEntregasPendentesAssociado);

  const { data, result, message } = await listar();
  if (result === ResultType.Fail) return res.status(500).json({ message, datails: data });
  return res.json(data);
}

async function listarEntregasPorMotoboy(req, res) {
  const id_associado = req.associado.id;
  const { data, result, message } = await entregaService.listarEntregasAssociadoPorMotoboy(id_associado);
  if (result === ResultType.Fail) return res.status(500).json({ message, datails: data });
  return res.json(data);
}

async function editarEntrega(req, res) {
  const id = req.params.id;
  const entrega = req.body;

  const editar = () => !isNullOrUndefined(req.associado) ? entregaService.editarInformacoesEntrega(id, entrega) : entregaService.editarEntrega(id, entrega);

  const { data: { notFound, ...data }, result, message } = await editar();

  if (result === ResultType.Fail)
    return res.status(notFound ? 404 : 400).json({ message, details: data });

  return res.json(data);
}

async function removerEntrega(req, res) {
  const id = req.params.id;
  const id_associado = req.associado.id;

  const { data: { notFound, ...data }, result, message } = await entregaService.removerEntrega(id, id_associado);
  if (result === ResultType.Fail) return res.status(notFound ? 404 : 400).json({ message, details: data });
  return res.status(204).json();
}

module.exports = {
  cadastrarEntrega,
  listarTodasEntregas,
  listarEntregasFinalizadas,
  listarEntregasPendentes,
  listarEntregasPorMotoboy,
  editarEntrega,
  removerEntrega,
};
