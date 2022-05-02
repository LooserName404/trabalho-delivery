const Joi = require('joi')
const { cnpjValidationSchema } = require('./generalValidation')

const cadastrarClienteDtoValidationSchema = Joi.object({
  nome: Joi.string().alphanum().min(3).required().messages({
    'string.alphanum': 'O nome deve ser alfanumérico.',
    'string.min': 'O nome deve conter 3 ou mais caracteres.',
    'any.required': "O campo 'nome' é obrigatório."
  }),
  cnpj: cnpjValidationSchema,
  endereco: Joi.string().required().messages({ 'any.required': "O campo 'endereco' é obrigatório." })
})

module.exports = {
  cadastrarClienteDtoValidationSchema
}
