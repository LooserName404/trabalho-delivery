const Joi = require('joi');
const { cnpjValidationSchema, senhaValidationSchema, nomeValidationSchema, nomeOpcionalValidationSchema } = require('./generalValidation');


const cadastrarAssociadoDtoValidationSchema = Joi.object({
  nome: nomeValidationSchema,
  cnpj: cnpjValidationSchema,
  senha: senhaValidationSchema,
  endereco: Joi.string().optional()
});

const atualizarAssociadoDtoValidationSchema = Joi.object({
  nome: nomeOpcionalValidationSchema,
  senha: senhaValidationSchema,
  endereco: Joi.string().optional()
});

module.exports = {
  cadastrarAssociadoDtoValidationSchema,
  atualizarAssociadoDtoValidationSchema
};
