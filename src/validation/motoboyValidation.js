const Joi = require('joi');
const { cpfValidationSchema, senhaValidationSchema, nomeValidationSchema, telefoneValidationSchema, nomeOpcionalValidationSchema, senhaOpcionalValidationSchema, telefoneOpcionalValidationSchema } = require('./generalValidation');

const cadastrarMotoboyDtoValidationSchema = Joi.object({
  nome: nomeValidationSchema,
  cpf: cpfValidationSchema,
  senha: senhaValidationSchema,
  telefone: telefoneValidationSchema,
});

const atualizarMotoboyDtoValidationSchema = Joi.object({
  nome: nomeOpcionalValidationSchema,
  senha: senhaOpcionalValidationSchema,
  telefone: telefoneOpcionalValidationSchema,
});

module.exports = {
  cadastrarMotoboyDtoValidationSchema,
  atualizarMotoboyDtoValidationSchema,
};
