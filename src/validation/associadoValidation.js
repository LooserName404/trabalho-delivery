const Joi = require('joi')
const { cnpjValidationSchema } = require('./generalValidation')

const senhaPattern = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/

const cadastrarAssociadoDtoValidationSchema = Joi.object({
  nome: Joi.string()
    .alphanum()
    .min(3)
    .required()
    .messages({
      'string.alphanum': 'O nome deve ser alfanumérico.',
      'string.min': 'O nome deve conter 3 ou mais caracteres.',
      'any.required': "O campo 'nome' é obrigatório."
    }),
  cnpj: cnpjValidationSchema,
  senha: Joi.string()
    .min(8)
    .pattern(senhaPattern)
    .required()
    .messages({ '*': 'A senha deve conter no mínimo 8 caracteres e incluir, no mínimo, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.' }),
  endereco: Joi.string()
    .optional()
})

const atualizarAssociadoDtoValidationSchema = Joi.object({
  nome: Joi.string()
    .alphanum()
    .min(3)
    .messages({
      'string.alphanum': 'O nome deve ser alfanumérico.',
      'string.min': 'O nome deve conter 3 ou mais caracteres.',
    }),
  senha: Joi.string()
    .min(8)
    .pattern(senhaPattern)
    .messages({ '*': 'A senha deve conter no mínimo 8 caracteres e incluir, no mínimo, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.' }),
  endereco: Joi.string()
})

module.exports = {
  cadastrarAssociadoDtoValidationSchema,
  atualizarAssociadoDtoValidationSchema
}
