const { Result, ResultType } = require('../helpers/result');
const entregaRepository = require('../repositories/entregaRepository');
const clienteAssociadoRepository = require('../repositories/clienteAssociadoRepository');
const motoboyRepository = require('../repositories/motoboyRepository');
const { cadastrarEntregaDtoValidationSchema, atualizarEntregaAssociadoDtoValidationSchema, atualizarEntregaMotoboyDtoValidationSchema } = require('../validation/entregaValidation');
const Joi = require('joi');

async function cadastrarEntrega(id_associado, cadastrarEntregaDto) {
  const { error } = cadastrarEntregaDtoValidationSchema.validate(cadastrarEntregaDto);

  if (error)
    return Result.Fail('Dados inválidos. Envie todos os campos obrigatórios de forma correta.', error.details);

  const { cpf, cnpj, descricao } = cadastrarEntregaDto;

  const motoboy = await motoboyRepository.findByCpf(cpf);
  if (motoboy == null) return Result.Fail('Motoboy não encontrado', cpf);

  const relacao = await clienteAssociadoRepository.findByIdAssociadoCnpjCliente(id_associado, cnpj);
  if (relacao == null)
    return Result.Fail('Não há relação com esse cliente. Caso desejar, ele pode ser relacionado ao associado.', cnpj);

  const { id_cliente } = relacao;

  const entrega = { id_associado, id_cliente, id_motoboy: motoboy.id, descricao };

  const dbCommand = await entregaRepository.insert(entrega);

  if (dbCommand.result === ResultType.Fail)
    return Result.Fail('Erro ao cadastrar entrega no banco de dados.', dbCommand.data);

  return Result.Ok(dbCommand.data);
}

async function listarTodasEntregasAssociado(id_associado) {
  try {
    return Result.Ok(await entregaRepository.findByAssociado(id_associado));
  } catch (e) {
    return Result.Fail('Erro ao efetuar consulta de entregas no banco de dados', e);
  }
}

async function listarTodasEntregasMotoboy(id_motoboy) {
  try {
    return Result.Ok(await entregaRepository.findByMotoboy(id_motoboy));
  } catch (e) {
    return Result.Fail('Erro ao efetuar consulta de entregas no banco de dados', e);
  }
}

async function listarEntregasFinalizadasAssociado(id_associado) {
  try {
    return Result.Ok(await entregaRepository.findByAssociadoWithStatus(id_associado, 'finalizada'));
  } catch (e) {
    return Result.Fail('Erro ao efetuar consulta de entregas no banco de dados', e);
  }
}

async function listarEntregasFinalizadasMotoboy(id_motoboy) {
  try {
    return Result.Ok(await entregaRepository.findByMotoboyWithStatus(id_motoboy, 'finalizada'));
  } catch (e) {
    return Result.Fail('Erro ao efetuar consulta de entregas no banco de dados', e);
  }
}

async function listarEntregasPendentesAssociado(id_associado) {
  try {
    return Result.Ok(await entregaRepository.findByAssociadoWithStatus(id_associado, 'pendente'));
  } catch (e) {
    return Result.Fail('Erro ao efetuar consulta de entregas no banco de dados', e);
  }
}

async function listarEntregasPendentesMotoboy(id_motoboy) {
  try {
    return Result.Ok(await entregaRepository.findByMotoboyWithStatus(id_motoboy, 'pendente'));
  } catch (e) {
    return Result.Fail('Erro ao efetuar consulta de entregas no banco de dados', e);
  }
}

async function listarEntregasAssociadoPorMotoboy(id_associado) {
  try {
    return Result.Ok(await motoboyRepository.findByAssociadoIncludingEntregas(id_associado, 'pendente'));
  } catch (e) {
    return Result.Fail('Erro ao efetuar consulta de entregas no banco de dados', e);
  }
}

async function editarInformacoesEntrega(id, atualizarEntregaAssociadoDto) {
  const { error } = atualizarEntregaAssociadoDtoValidationSchema.validate(atualizarEntregaAssociadoDto);
  if (error) return Result.Fail('Dados inválidos.', error.details);

  const entregaExistente = await entregaRepository.findById(id);

  if (entregaExistente == null)
    return Result.Fail('Nenhuma entrega com este identificador foi encontrada', { notFound: true, id });

  const { descricao } = atualizarEntregaAssociadoDto;

  const entrega = {
    descricao: descricao ?? entregaExistente.descricao,
    id
  };
  const dbCommand = await entregaRepository.update(entrega);

  if (dbCommand.result === ResultType.Fail)
    return Result.Fail('Erro ao atualizar entrega no banco de dados', dbCommand.data);

  return Result.Ok(dbCommand.data);
}

async function editarEntrega(id, atualizarEntregaMotoboyDto) {
  const { error } = atualizarEntregaMotoboyDtoValidationSchema.validate(atualizarEntregaMotoboyDto);
  if (error) return Result.Fail('Dados inválidos.', error.details);

  const entregaExistente = await entregaRepository.findById(id);

  if (entregaExistente == null)
    return Result.Fail('Nenhuma entrega com este identificador foi encontrada', { notFound: true, id });

  const { valor, status } = atualizarEntregaMotoboyDto;

  if ((!valor || valor <= 0) && (!entregaExistente.valor || entregaExistente.valor <= 0) && status === 'finalizada')
    return Result.Fail('Não é possível finalizar uma entrega que não tenha valor definido', { id });

  const entrega = {
    valor: valor ?? entregaExistente.valor,
    status: status ?? entregaExistente.status,
    id
  };
  const dbCommand = await entregaRepository.update(entrega);

  if (dbCommand.result === ResultType.Fail)
    return Result.Fail('Erro ao atualizar entrega no banco de dados', dbCommand.data);

  return Result.Ok(dbCommand.data);
}

async function removerEntrega(id, id_associado) {
  const { error } = Joi.number().validate(id);
  if (error) return Result.Fail('Identificador inválido', error.details);

  const entregaExistente = await entregaRepository.findById(id);
  if (entregaExistente == null || entregaExistente.id_associado != id_associado)
    return Result.Fail('Nenhuma entrega com este identificador foi encontrada', { notFound: true, id });

  if (entregaExistente.status === 'finalizada')
    return Result.Fail('Não é possível excluir uma entrega já finalizada', entregaExistente.dataValues);

  const dbCommand = await entregaRepository.deleteById(id);

  if (!dbCommand)
    return Result.Fail('Nenhuma entrega com este identificador foi encontrada', { notFound: true, id });

  return Result.Ok({});
}

module.exports = {
  cadastrarEntrega,
  listarTodasEntregasAssociado,
  listarTodasEntregasMotoboy,
  listarEntregasFinalizadasAssociado,
  listarEntregasFinalizadasMotoboy,
  listarEntregasPendentesAssociado,
  listarEntregasPendentesMotoboy,
  listarEntregasAssociadoPorMotoboy,
  editarInformacoesEntrega,
  editarEntrega,
  removerEntrega,
};
