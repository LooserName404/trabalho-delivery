const bcrypt = require('bcrypt');
const { Result, ResultType } = require('../helpers/result');
const { cadastrarMotoboyDtoValidationSchema, atualizarMotoboyDtoValidationSchema } = require('../validation/motoboyValidation');
const motoboyRepository = require('../repositories/motoboyRepository');
const { cpfValidationSchema, senhaValidationSchema } = require('../validation/generalValidation');
const jwt = require('jsonwebtoken');

async function cadastrarMotoboy(cadastrarMotoboyDto) {
  const { error } = cadastrarMotoboyDtoValidationSchema.validate(cadastrarMotoboyDto);
  if (error)
    return Result.Fail('Dados inválidos. Envie todos os campos obrigatórios de forma correta.', error.details);

  const motoboyExistente = await motoboyRepository.findByCpf(cadastrarMotoboyDto.cpf);
  if (motoboyExistente != null)
    return Result.Fail('Já existe um motoboy com este CPF.', motoboyExistente);

  const salt = bcrypt.genSalt();
  const hash = bcrypt.hash(cadastrarMotoboyDto.senha, await salt);
  const motoboy = { ...cadastrarMotoboyDto, senha: await hash };

  const dbCommand = await motoboyRepository.insert(motoboy);

  if (dbCommand.result === ResultType.Fail)
    return Result.Fail('Erro ao cadastrar motoboy no banco de dados.', dbCommand.data);

  return Result.Ok(dbCommand.data);
}

async function listarTodosMotoboys() {
  try {
    return Result.Ok(await motoboyRepository.findAll());
  } catch (e) {
    return Result.Fail('Erro ao efetuar consulta de motoboys no banco de dados', e);
  }
}

async function buscarMotoboyPorCpf(cpf) {
  const motoboy = await motoboyRepository.findByCpf(cpf);
  if (motoboy === null) return Result.Fail('Motoboy não encontrado', cpf);
  return Result.Ok(motoboy);
}

async function editarPorCpf(cpf, atualizarMotoboyDto) {
  const { error: cpfError } = cpfValidationSchema.validate(cpf);
  if (cpfError) return Result.Fail('CPF inválido.', cpfError.details);

  const { error: motoboyError } = atualizarMotoboyDtoValidationSchema.validate(atualizarMotoboyDto);
  if (motoboyError) return Result.Fail('Dados inválidos.', motoboyError.details);

  const motoboyExistente = await motoboyRepository.findByCpfWithSenha(cpf);

  if (motoboyExistente == null)
    return Result.Fail('Nenhum motoboy com este CPF foi encontrado', { notFound: true, cpf });

  const { nome, senha, telefone } = atualizarMotoboyDto;

  const motoboy = {
    nome: nome ?? motoboyExistente.nome,
    senha: senha ?? motoboyExistente.senha,
    telefone: telefone ?? motoboyExistente.telefone,
    cpf
  };
  const dbCommand = await motoboyRepository.update(motoboy);

  if (dbCommand.result === ResultType.Fail)
    return Result.Fail('Erro ao atualizar motoboy no banco de dados', dbCommand.data);

  return Result.Ok(dbCommand.data);
}

async function removerMotoboy(cpf) {
  const { error } = cpfValidationSchema.validate(cpf);
  if (error) return Result.Fail('CPF inválido.', error.details);

  const motoboyExistente = await motoboyRepository.findByCpf(cpf);
  if (motoboyExistente == null)
    return Result.Fail('Nenhum motoboy com este CPF foi encontrado', { notFound: true, cpf });

  const dbCommand = await motoboyRepository.deleteByCpf(cpf);

  if (!dbCommand)
    return Result.Fail('Nenhum motoboy com este CPF foi encontrado', { notFound: true, cpf });

  return Result.Ok({});
}

async function autenticar(cpf, senha) {
  const fail = Result.Fail('CPF e/ou senha incorreto(s)', {});

  const { error: cpfError } = cpfValidationSchema.validate(cpf);
  if (cpfError) return fail;

  const { error: senhaError } = senhaValidationSchema.validate(senha);
  if (senhaError) return fail;

  const motoboy = await motoboyRepository.findByCpfWithSenha(cpf);

  if (motoboy == null) return fail;

  const compare = bcrypt.compare(senha, motoboy.senha);
  if (!await compare) return fail;

  const { senha: _, ...motoboySemSenha } = motoboy.dataValues;

  return Result.Ok({ message: 'Motoboy autenticado com sucesso', token: gerarToken(motoboySemSenha) });
}

function gerarToken(motoboy) {
  const secret = process.env.TOKEN_SECRET;
  if (motoboy.senha != undefined) throw new Error();
  const token = jwt.sign(motoboy, secret, { expiresIn: 82800 });
  return token;
}

module.exports = {
  cadastrarMotoboy,
  listarTodosMotoboys,
  buscarMotoboyPorCpf,
  editarPorCpf,
  removerMotoboy,
  autenticar,
};
