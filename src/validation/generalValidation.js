const Joi = require('joi')

const cnpjPattern = /\d{2}.?\d{3}.?\d{3}\/?\d{4}-?\d{2}/

const cnpjValidationMessages = {
  'string.pattern.base': 'O CNPJ deve conter 14 caracteres e conter apenas números. Preencha o início com zeros, caso necessário.',
  'string.pattern': 'O CNPJ deve conter 14 caracteres e conter apenas números. Preencha o início com zeros, caso necessário.',
  'any.required': 'O CNPJ é obrigatório.'
}

const cnpjValidationSchema = Joi.string().pattern(cnpjPattern).required().messages(cnpjValidationMessages)

module.exports = {
  cnpjValidationSchema
}
