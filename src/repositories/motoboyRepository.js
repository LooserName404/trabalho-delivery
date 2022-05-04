const Motoboy = require('../models/Motoboy');
const isNullOrUndefined = require('../helpers/isNullOrUndefined');
const { Result } = require('../helpers/result');
const Entrega = require('../models/Entrega');

function findAll() {
  return Motoboy.findAll();
}

function findById(id) {
  return Motoboy.findByPk(id, { attributes: { exclude: [ 'senha' ] }})
    .then(motoboy => !isNullOrUndefined(motoboy) ? motoboy : null)
    .catch(() => null);
}

function findByCpf(cpf) {
  return Motoboy.findOne({ where: { cpf }, attributes: { exclude: [ 'senha' ] }})
    .then(motoboy => !isNullOrUndefined(motoboy) ? motoboy : null)
    .catch(() => null);
}

function findByCpfWithSenha(cpf) {
  return Motoboy.findOne({ where: { cpf }})
    .then(motoboy => !isNullOrUndefined(motoboy) ? motoboy : null)
    .catch(() => null);
}

function findByAssociadoIncludingEntregas(id_associado) {
  return Motoboy.findAll({ include: {
    model: Entrega,
    where: { id_associado }
  }});
}

function insert(motoboy) {
  return Motoboy.create(motoboy)
    .then(motoboy => Result.Ok(motoboy))
    .catch(err => Result.Fail('Erro ao inserir motoboy', err));
}

function update(motoboy) {
  return Motoboy.update(motoboy, { where: { cpf: motoboy.cpf }})
    .then(([count]) => count > 0
      ? Result.Ok(motoboy)
      : Result.Fail('Nenhum registro encontrado', { cpf: motoboy.cpf }))
    .catch(err => Result.Fail('Erro ao atualizar motoboy', err));
}

function deleteByCpf(cpf) {
  return Motoboy.destroy({ where: { cpf }})
    .then(count => count > 0)
    .catch(() => false);
}

module.exports = {
  findAll,
  findById,
  findByCpf,
  findByCpfWithSenha,
  findByAssociadoIncludingEntregas,
  insert,
  update,
  deleteByCpf
};
