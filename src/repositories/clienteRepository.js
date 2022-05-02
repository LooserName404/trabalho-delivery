const Cliente = require('../models/Cliente')
const ClienteAssociado = require('../models/ClienteAssociado')
const isNullOrUndefined = require('../helpers/isNullOrUndefined')
const { Result } = require('../helpers/result')

function findAll() {
  return Cliente.findAll()
}

function findById(id) {
  return Cliente.findByPk(id)
    .then(cliente => !isNullOrUndefined(cliente) ? cliente : null)
    .catch(() => null)
}

function findByCnpj(cnpj) {
  return Cliente.findOne({ where: { cnpj } })
    .then(cliente => !isNullOrUndefined(cliente) ? cliente : null)
    .catch(() => null)
}

function findByAssociado(id_associado) {
  return ClienteAssociado.findAll({ where: { id_associado } })
    .then(async relacoes => await Promise.all(relacoes.map(r => r.getCliente())))
    .catch(() => null)
}

function insert(cliente) {
  return Cliente.create(cliente)
    .then(clienteNovo => Result.Ok(clienteNovo))
    .catch(err => Result.Fail('Erro ao inserir cliente', err))
}

function update(cliente) {
  return Cliente.update(cliente, { where: { cnpj: cliente.cnpj } })
    .then(([count, _]) => count > 0
      ? Result.Ok(cliente)
      : Result.Fail('Nenhum registro encontrado', { cnpj: cliente.cnpj }))
    .catch(err => Result.Fail('Erro ao atualizar cliente', err))
}

function deleteByCnpj(cnpj) {
  return Cliente.destroy({ where: { cnpj } })
    .then(count => count > 0)
    .catch(() => false)
}

module.exports = {
  findAll,
  findById,
  findByCnpj,
  findByAssociado,
  insert,
  update,
  deleteByCnpj
}
