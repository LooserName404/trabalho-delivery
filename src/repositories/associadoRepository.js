const Associado = require('../models/Associado');
const isNullOrUndefined = require('../helpers/isNullOrUndefined');
const { Result } = require('../helpers/result');

function findAll() {
  return Associado.findAll();
}

function findById(id) {
  return Associado.findByPk(id, { attributes: { exclude: ['senha'] } })
    .then(associado => !isNullOrUndefined(associado) ? associado : null)
    .catch(() => null);
}

function findByName(nome) {
  return Associado.findOne({ where: { nome }, attributes: { exclude: ['senha'] } })
    .then(associado => !isNullOrUndefined(associado) ? associado : null)
    .catch(() => null);
}

function findByCnpj(cnpj) {
  return Associado.findOne({ where: { cnpj }, attributes: { exclude: ['senha'] } })
    .then(associado => !isNullOrUndefined(associado) ? associado : null)
    .catch(() => null);
}

function findByCnpjWithSenha(cnpj) {
  return Associado.findOne({ where: { cnpj } })
    .then(associado => !isNullOrUndefined(associado) ? associado : null)
    .catch(() => null);
}

function insert(associado) {
  return Associado.create(associado)
    .then(associado => Result.Ok(associado))
    .catch(err => Result.Fail('Erro ao inserir associado', err));
}

function update(associado) {
  return Associado.update(associado, { where: { cnpj: associado.cnpj }, attributes: { } })
    .then(([count]) => count > 0
      ? Result.Ok(associado)
      : Result.Fail('Nenhum registro encontrado', { cnpj: associado.cnpj }))
    .catch(err => Result.Fail('Erro ao atualizar associado', err));
}

function deleteByCnpj(cnpj) {
  return Associado.destroy({ where: { cnpj } })
    .then(count => count > 0)
    .catch(() => false);
}

module.exports = {
  findAll,
  findById,
  findByName,
  findByCnpj,
  findByCnpjWithSenha,
  insert,
  update,
  deleteByCnpj
};
