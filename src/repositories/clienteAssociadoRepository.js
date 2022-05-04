const isNullOrUndefined = require('../helpers/isNullOrUndefined');
const { Result } = require('../helpers/result');
const ClienteAssociado = require('../models/ClienteAssociado');
const Cliente = require('../models/Cliente');

function findByIds(relacao) {
  const { id_cliente, id_associado } = relacao;
  return ClienteAssociado.findOne({ where: { id_associado, id_cliente }})
    .then(relacao => !isNullOrUndefined(relacao) ? relacao : null)
    .catch(() => null);
}

function findByIdCliente(id_cliente) {
  return ClienteAssociado.findAll({ where: { id_cliente }})
    .catch(() => []);
}

function findByIdAssociadoCnpjCliente(id_associado, cnpj) {
  return ClienteAssociado.findOne({ where: { id_associado }, include: {
    model: Cliente,
    where: { cnpj }
  }})
    .then(relacao => !isNullOrUndefined(relacao) ? relacao : null)
    .catch(() => null);
}

function insert(relacao) {
  return ClienteAssociado.create(relacao)
    .then(relacao => Result.Ok(relacao))
    .catch(err => Result.Fail('Erro ao inserir relacao', err));
}

function deleteByIds(relacao) {
  const { id_cliente, id_associado } = relacao;
  return ClienteAssociado.destroy({ where: { id_associado, id_cliente }})
    .then(count => count > 0)
    .catch(() => false);
}

module.exports = {
  findByIds,
  findByIdCliente,
  findByIdAssociadoCnpjCliente,
  insert,
  deleteByIds
};
