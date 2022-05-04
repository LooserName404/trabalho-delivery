const Entrega = require('../models/Entrega');
const isNullOrUndefined = require('../helpers/isNullOrUndefined');
const { Result } = require('../helpers/result');

function findAll() {
  return Entrega.findAll();
}

function findById(id) {
  return Entrega.findByPk(id)
    .then(entrega => !isNullOrUndefined(entrega) ? entrega : null)
    .catch(() => null);
}

function findByAssociado(id_associado) {
  return Entrega.findAll({ where: { id_associado }})
    .then(entrega => !isNullOrUndefined(entrega) ? entrega : null)
    .catch(() => null);
}

function findByAssociadoWithStatus(id_associado, status) {
  return Entrega.findAll({ where: { id_associado, status }})
    .then(entrega => !isNullOrUndefined(entrega) ? entrega : null)
    .catch(() => null);
}

function findByMotoboy(id_motoboy) {
  return Entrega.findAll({ where: { id_motoboy }})
    .then(entrega => !isNullOrUndefined(entrega) ? entrega : null)
    .catch(() => null);
}

function findByMotoboyWithStatus(id_motoboy, status) {
  return Entrega.findAll({ where: { id_motoboy, status }})
    .then(entrega => !isNullOrUndefined(entrega) ? entrega : null)
    .catch(() => null);
}

function insert(entrega) {
  return Entrega.create(entrega)
    .then(entrega => Result.Ok(entrega))
    .catch(err => Result.Fail('Erro ao inserir entrega', err));
}

function update(entrega) {
  return Entrega.update(entrega, { where: { id: entrega.id }})
    .then(([count]) => count > 0
      ? Result.Ok(entrega)
      : Result.Fail('Nenhum registro encontrado', { id: entrega.id }))
    .catch(err => Result.Fail('Erro ao atualizar entrega', err));
}

function deleteById(id) {
  return Entrega.destroy({ where: { id }})
    .then(count => count > 0)
    .catch(() => false);
}

module.exports = {
  findAll,
  findById,
  findByAssociado,
  findByMotoboy,
  findByAssociadoWithStatus,
  findByMotoboyWithStatus,
  insert,
  update,
  deleteById
};
