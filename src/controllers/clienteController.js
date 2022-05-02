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

module.exports = {
  cadastrarCliente,
  associarCliente
}
