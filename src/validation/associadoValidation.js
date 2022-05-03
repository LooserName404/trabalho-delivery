const Joi = require('joi');
const { cnpjValidationSchema, senhaValidationSchema } = require('./generalValidation');


const cadastrarAssociadoDtoValidationSchema = Joi.object({
  nome: Joi.string()
    .alphanum()
    .min(3)
    .required()
    .messages({
      'string.alphanum': 'O nome deve ser alfanumérico.',
      'string.min': 'O nome deve conter 3 ou mais caracteres.',
      'any.required': 'O campo \'nome\' é obrigatório.'
    }),
  cnpj: cnpjValidationSchema,
  senha: senhaValidationSchema,
  endereco: Joi.string().optional()
});

const atualizarAssociadoDtoValidationSchema = Joi.object({
  nome: Joi.string()
    .alphanum()
    .min(3)
    .messages({
      'string.alphanum': 'O nome deve ser alfanumérico.',
      'string.min': 'O nome deve conter 3 ou mais caracteres.',
    }),
  senha: senhaValidationSchema,
  endereco: Joi.string()
});

module.exports = {
  cadastrarAssociadoDtoValidationSchema,
  atualizarAssociadoDtoValidationSchema
};
