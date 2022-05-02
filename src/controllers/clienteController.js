const { ResultType } = require('../helpers/result')
const clienteService = require('../services/clienteService')

async function cadastrarCliente(req, res) {
  const cliente = req.body
  const { data, result, message } = await clienteService.cadastrarCliente(cliente)
  if (result === ResultType.Fail) return res.status(400).json({ message, details: data })

  return res.json(data)
}

async function associarCliente(req, res) {
  const cnpj = req.body.cnpj
  const { data, result, message } = await clienteService.associarCliente(cnpj, req.associado.id)
  if (result === ResultType.Fail) return res.status(400).json({ message, details: data })
  return res.json(data)
}

async function listarClientes(req, res) {
  const id_associado = req.associado.id
  const { data, result, message } = await clienteService.listarClientes(id_associado)
  if (result === ResultType.Fail) return res.status(500).json({ message, details: data })
  return res.json(data)
}

async function buscarPorCnpj(req, res) {
  const cnpj = req.params.cnpj
  const { data: { notFound = undefined, ...data }, result, message } = await clienteService.buscarPorCnpj(cnpj)
  if (result === ResultType.Fail) return res.status(notFound ? 404 : 400).json({ message, details: data })
  return res.json(data)
}

async function editarPorCnpj(req, res) {
  const cnpj = req.params.cnpj
  const cliente = req.body

  const { data: { notFound, ...data }, result, message } = await clienteService.editarPorCnpj(cnpj, cliente)

  if (result === ResultType.Fail)
    return res.status(notFound ? 404 : 400).json({ message, details: data })

  return res.json(data)
}

async function desassociarCliente(req, res) {
  const cnpj = req.body.cnpj
  const { data, result, message } = await clienteService.desassociarCliente(cnpj, req.associado.id)
  if (result === ResultType.Fail) return res.status(400).json({ message, details: data })
  return res.status(204).json()
}

async function deletarCliente(req, res) {
  const cnpj = req.params.cnpj
  const { data: { notFound = undefined, ...data }, result, message } = await clienteService.deletarCliente(cnpj)
  if (result === ResultType.Fail) return res.status(notFound ? 404 : 400).json({ message, details: data })
  return res.status(204).json()
}

module.exports = {
  cadastrarCliente,
  associarCliente,
  listarClientes,
  buscarPorCnpj,
  editarPorCnpj,
  desassociarCliente,
  deletarCliente
}
