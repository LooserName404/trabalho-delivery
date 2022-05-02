const { Result, ResultType } = require('../helpers/result')
const associadoRepository = require('../repositories/associadoRepository')
const { cadastrarAssociadoDtoValidationSchema, atualizarAssociadoDtoValidationSchema } = require('../validation/associadoValidation')
const { cnpjValidationSchema } = require('../validation/generalValidation')

async function cadastrarAssociado(associado) {
  const { error } = cadastrarAssociadoDtoValidationSchema.validate(associado)

  if (error)
    return Result.Fail('Dados inválidos. Envie todos os campos obrigatórios de forma correta.', error.details)

  const associadoExistente = await associadoRepository.findByCnpj(associado.cnpj)

  if (associadoExistente != null)
    return Result.Fail('Já existe um associado com este CNPJ.', associadoExistente)

  const dbCommand = await associadoRepository.insert(associado)

  if (dbCommand.result === ResultType.Fail)
    return Result.Fail('Erro ao cadastrar associado no banco de dados.', dbCommand.data)

  return Result.Ok(dbCommand.data)
}

async function listarTodosAssociados() {
  try {
    return Result.Ok(await associadoRepository.findAll())
  } catch (e) {
    return Result.Fail('Erro ao efetuar consulta de associados no banco de dados', e)
  }
}

async function buscarAssociadoPorNome(nome) {
  const associado = await associadoRepository.findByName(nome)
  if (associado === null) return Result.Fail('Associado não encontrado', nome)
  return Result.Ok(associado)
}

async function editarPorCnpj(cnpj, atualizarAssociadoDto) {
  const { error: cnpjError } = cnpjValidationSchema.validate(cnpj)
  if (cnpjError) return Result.Fail('CNPJ inválido.', cnpjError.details)

  const { error: associadoError } = atualizarAssociadoDtoValidationSchema.validate(atualizarAssociadoDto)
  if (associadoError) return Result.Fail('Dados inválidos.', associadoError.details)

  const associadoExistente = await associadoRepository.findByCnpjWithSenha(cnpj)

  if (associadoExistente == null)
    return Result.Fail('Nenhum associado com este CNPJ foi encontrado', { notFound: true, cnpj })

  const { nome, senha, endereco } = atualizarAssociadoDto

  const associado = {
    nome: nome ?? associadoExistente.nome,
    senha: senha ?? associadoExistente.senha,
    endereco: endereco ?? associadoExistente.endereco,
    cnpj
  }
  const dbCommand = await associadoRepository.update(associado)

  if (dbCommand.result === ResultType.Fail)
    return Result.Fail('Erro ao atualizar associado no banco de dados', dbCommand.data)

  return Result.Ok(dbCommand.data)
}

async function removerAssociado(cnpj) {
  const { error } = cnpjValidationSchema.validate(cnpj)
  if (error) return Result.Fail('CNPJ inválido.', error.details)

  const associadoExistente = await associadoRepository.findByCnpj(cnpj)
  if (associadoExistente == null)
    return Result.Fail('Nenhum associado com este CNPJ foi encontrado', { notFound: true, cnpj })

  const dbCommand = await associadoRepository.deleteByCnpj(cnpj)

  if (!dbCommand)
    return Result.Fail('Nenhum associado com este CNPJ foi encontrado', { notFound: true, cnpj })

  return Result.Ok({})
}

module.exports = {
  cadastrarAssociado,
  listarTodosAssociados,
  buscarAssociadoPorNome,
  editarPorCnpj,
  removerAssociado
}
