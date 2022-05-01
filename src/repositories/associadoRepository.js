const Associado = require('../models/Associado')
const isNullOrUndefined = require('../helpers/isNullOrUndefined')

function findAll() {
  return Associado.findAll()
}

function findById(id) {
  return Associado.findByPk(id)
    .then(associado => isNullOrUndefined(associado) ? null : associado)
    .catch(() => null)
}

function findByName(nome) {
  return Associado.findOne({ where: { nome } })
    .then(associado => isNullOrUndefined(associado) ? null : associado)
    .catch(() => null)
}

function insert(associado) {
  return Associado.create(associado)
    .then(() => true)
    .catch(() => false)
}

function update(associado) {
  return Associado.update(associado, { where: { cnpj: associado.cnpj } })
    .then(() => true)
    .catch(() => false)
}

function deleteById(id) {
  return Associado.destroy({ where: { id } })
    .then(count => count > 0)
    .catch(() => false)
}

module.exports = {
  findAll,
  findById,
  findByName,
  insert,
  update,
  deleteById
}
