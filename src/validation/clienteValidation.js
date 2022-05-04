const Joi = require('joi');
const { cnpjValidationSchema, nomeValidationSchema, nomeOpcionalValidationSchema } = require('./generalValidation');

const cadastrarClienteDtoValidationSchema = Joi.object({
  nome: nomeValidationSchema,
  cnpj: cnpjValidationSchema,
  endereco: Joi.string().required().messages({ 'any.required': 'O campo \'endereco\' é obrigatório.' })
});

const atualizarClienteDtoValidationSchema = Joi.object({
  nome: nomeOpcionalValidationSchema,
  endereco: Joi.string().messages({ 'any.required': 'O campo \'endereco\' é obrigatório.' })
});

module.exports = {
  cadastrarClienteDtoValidationSchema,
  atualizarClienteDtoValidationSchema
};
