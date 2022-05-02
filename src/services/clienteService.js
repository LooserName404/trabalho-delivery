const { Result, ResultType } = require("../helpers/result")
const { cadastrarClienteDtoValidationSchema, atualizarClienteDtoValidationSchema } = require("../validation/clienteValidation")
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

async function listarClientes(id_associado) {
  try {
    return Result.Ok(await clienteRepository.findByAssociado(id_associado))
  } catch (e) {
    return Result.Fail('Erro ao buscar clientes no banco de dados', e)
  }
}

async function buscarPorCnpj(cnpj) {
  const { error } = cnpjValidationSchema.validate(cnpj)
  if (error) return Result.Fail('CNPJ inválido.', { cnpj, ...error.details })

  const dbCommand = await clienteRepository.findByCnpj(cnpj)
  if (dbCommand?.dataValues == null)
    return Result.Fail('Não há um cliente com este CNPJ cadastrado.', { cnpj, notFound: true })

  return Result.Ok(dbCommand.dataValues)
}

async function editarPorCnpj(cnpj, atualizarClienteDto) {
  const { error: cnpjError } = cnpjValidationSchema.validate(cnpj)
  if (cnpjError) return Result.Fail('CNPJ inválido.', cnpjError.details)

  const { error: clienteError } = atualizarClienteDtoValidationSchema.validate(atualizarClienteDto)
  if (clienteError) return Result.Fail('Dados inválidos.', clienteError.details)

  const clienteExistente = await clienteRepository.findByCnpj(cnpj)

  if (clienteExistente == null)
    return Result.Fail('Nenhum cliente com este CNPJ foi encontrado', { notFound: true, cnpj })

  const { nome, endereco } = atualizarClienteDto

  const cliente = {
    nome: nome ?? clienteExistente.nome,
    endereco: endereco ?? clienteExistente.endereco,
    cnpj
  }
  const dbCommand = await clienteRepository.update(cliente)

  if (dbCommand.result === ResultType.Fail)
    return Result.Fail('Erro ao atualizar cliente no banco de dados', dbCommand.data)

  return Result.Ok(dbCommand.data)
}

async function desassociarCliente(cnpjCliente, associadoId) {
  const { error } = cnpjValidationSchema.validate(cnpjCliente)
  if (error)
    return Result.Fail('CNPJ inválido.', { cnpj: cnpjCliente, ...error.details })

  const clienteExistente = await clienteRepository.findByCnpj(cnpjCliente)
  if (clienteExistente == null)
    return Result.Fail('Não há um cliente com este CNPJ cadastrado.', { cnpj: cnpjCliente })

  const relacao = { id_associado: associadoId, id_cliente: clienteExistente.id }

  const relacaoExiste = await clienteAssociadoRepository.findByIds(relacao)
  if (relacaoExiste == null) return Result.Fail('Relação com cliente inexistente', { cnpj: cnpjCliente })

  const dbCommand = await clienteAssociadoRepository.deleteByIds(relacao)
  if (!dbCommand) return Result.Fail('Erro ao desassociar no banco de dados')

  return Result.Ok({})
}

async function deletarCliente(cnpj) {
  const { error } = cnpjValidationSchema.validate(cnpj)
  if (error)
    return Result.Fail('CNPJ inválido.', { cnpj, ...error.details })

  const clienteExistente = await clienteRepository.findByCnpj(cnpj)
  if (clienteExistente == null)
    return Result.Fail('Nenhum cliente com este CNPJ foi encontrado', { notFound: true, cnpj })

  const relacoes = await clienteAssociadoRepository.findByIdCliente(clienteExistente.id)

  if (relacoes?.length > 0)
    return Result.Fail('Este cliente possui associações, portanto não pode ser excluído.', { cnpj })

  const dbCommand = await clienteRepository.deleteByCnpj(cnpj)

  if (!dbCommand)
    return Result.Fail('Nenhum cliente com este CNPJ foi encontrado', { notFound: true, cnpj })

  return Result.Ok({})

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
