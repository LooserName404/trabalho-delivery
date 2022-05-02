const { Result, ResultType } = require("../helpers/result")
const { cadastrarClienteDtoValidationSchema } = require("../validation/clienteValidation")
const clienteRepository = require('../repositories/clienteRepository')
const clienteAssociadoRepository = require('../repositories/clienteAssociadoRepository')
const { cnpjValidationSchema } = require("../validation/generalValidation")

async function cadastrarCliente(cadastrarClienteDto) {
  const { error } = cadastrarClienteDtoValidationSchema.validate(cadastrarClienteDto)
  if (error) return Result.Fail('Dados inválidos.', error.details)

  const clienteExistente = await clienteRepository.findByCnpj(cadastrarClienteDto.cnpj)
  if (clienteExistente != null) return Result.Fail('Já há um cliente cadastrado com este CNPJ. Caso desejar, você pode associar ele à sua lista.', clienteExistente)

  const dbCommand = await clienteRepository.insert(cadastrarClienteDto)
  if (dbCommand.result === ResultType.Fail) return Result.Fail('Erro ao cadastrar cliente', dbCommand.data)

  return Result.Ok(dbCommand.data)
}

async function associarCliente(cnpjCliente, associadoId) {
  const { error } = cnpjValidationSchema.validate(cnpjCliente)
  if (error)
    return Result.Fail('CNPJ inválido.', { cnpj: cnpjCliente, ...error.details })

  const clienteExistente = await clienteRepository.findByCnpj(cnpjCliente)
  if (clienteExistente == null)
    return Result.Fail('Não há um cliente com este CNPJ cadastrado. Efetue o cadastro para associar.', { cnpj: cnpjCliente })

  const relacao = { id_associado: associadoId, id_cliente: clienteExistente.id }

  const relacaoExiste = await clienteAssociadoRepository.findByIds(relacao)
  if (relacaoExiste != null) return Result.Fail('Cliente já relacionado ao associado', { cnpj: cnpjCliente })

  const dbCommand = await clienteAssociadoRepository.insert(relacao)
  if (dbCommand.result === ResultType.Fail) return Result.Fail('Erro ao associar no banco de dados', dbCommand.data)

  return Result.Ok(dbCommand.data)
}

module.exports = {
  cadastrarCliente,
  associarCliente
}
