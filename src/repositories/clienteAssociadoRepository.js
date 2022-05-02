const isNullOrUndefined = require('../helpers/isNullOrUndefined')
const { Result } = require('../helpers/result')
const ClienteAssociado = require('../models/ClienteAssociado')

function findByIds(relacao) {
  const { id_cliente, id_associado } = relacao
  return ClienteAssociado.findOne({ where: { id_associado, id_cliente } })
    .then(relacao => !isNullOrUndefined(relacao) ? relacao : null)
    .catch(() => null)
}

function insert(relacao) {
  return ClienteAssociado.create(relacao)
    .then(relacao => Result.Ok(relacao))
    .catch(err => Result.Fail('Erro ao inserir relacao', err))
}

module.exports = {
  findByIds,
  insert
}
