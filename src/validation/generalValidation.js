const Joi = require('joi')

const cnpjPattern = /\d{2}.?\d{3}.?\d{3}\/?\d{4}-?\d{2}/
const senhaPattern = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/

const cnpjValidationMessages = {
  'string.pattern.base': 'O CNPJ deve conter 14 caracteres e conter apenas números. Preencha o início com zeros, caso necessário.',
  'string.pattern': 'O CNPJ deve conter 14 caracteres e conter apenas números. Preencha o início com zeros, caso necessário.',
  'any.required': 'O CNPJ é obrigatório.'
}
const senhaValidationMessages = {
  '*': 'A senha deve conter no mínimo 8 caracteres e incluir, no mínimo, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.'
}

const cnpjValidationSchema = Joi.string().pattern(cnpjPattern).required().messages(cnpjValidationMessages)
const senhaValidationSchema = Joi.string()
  .min(8)
  .pattern(senhaPattern)
  .required()
  .messages(senhaValidationMessages)
const senhaOpcionalValidationSchema = Joi.string()
  .min(8)
  .pattern(senhaPattern)
  .messages(senhaValidationMessages)

module.exports = {
  cnpjValidationSchema,
  senhaValidationSchema,
  senhaOpcionalValidationSchema
}
