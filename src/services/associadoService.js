const { Result, ResultType } = require('../helpers/result')
const associadoRepository = require('../repositories/associadoRepository')
const { cadastrarAssociadoDtoValidationSchema, atualizarAssociadoDtoValidationSchema } = require('../validation/associadoValidation')
const { cnpjValidationSchema, senhaValidationSchema } = require('../validation/generalValidation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function cadastrarAssociado(cadastrarAssociadoDto) {
  const { error } = cadastrarAssociadoDtoValidationSchema.validate(cadastrarAssociadoDto)

  if (error)
    return Result.Fail('Dados inválidos. Envie todos os campos obrigatórios de forma correta.', error.details)

  const associadoExistente = await associadoRepository.findByCnpj(cadastrarAssociadoDto.cnpj)

  if (associadoExistente != null)
    return Result.Fail('Já existe um associado com este CNPJ.', associadoExistente)

  const salt = bcrypt.genSalt()
  const hash = bcrypt.hash(cadastrarAssociadoDto.senha, await salt)
  const associado = { ...cadastrarAssociadoDto, senha: await hash }

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

async function autenticar(cnpj, senha) {
  const fail = Result.Fail('CNPJ e/ou senha incorreto(s)', {})

  const { error: cnpjError } = cnpjValidationSchema.validate(cnpj)
  if (cnpjError) return fail

  const { error: senhaError } = senhaValidationSchema.validate(senha)
  if (senhaError) return fail

  const associado = await associadoRepository.findByCnpjWithSenha(cnpj)

  if (associado == null) return fail

  const compare = bcrypt.compare(senha, associado.senha)
  if (!await compare) return fail

  const { senha: _, ...associadoSemSenha } = associado.dataValues

  return Result.Ok({ message: 'Associado autenticado com sucesso', token: gerarToken(associadoSemSenha) })
}

function gerarToken(associado) {
  const secret = process.env.TOKEN_SECRET
  console.log(associado.senha)
  if (associado.senha != undefined) throw new Error()
  const token = jwt.sign(associado, secret, { expiresIn: 82800 })
  return token
}

module.exports = {
  cadastrarAssociado,
  listarTodosAssociados,
  buscarAssociadoPorNome,
  editarPorCnpj,
  removerAssociado,
  autenticar
}
