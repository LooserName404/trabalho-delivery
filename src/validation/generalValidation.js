const Joi = require('joi');

// Nome
const nomeValidationSchemaBase = Joi.string().alphanum().min(3).messages({
  'string.alphanum': 'O nome deve ser alfanumérico.',
  'string.min': 'O nome deve conter 3 ou mais caracteres.',
  'any.required': 'O campo \'nome\' é obrigatório.'
});
const nomeValidationSchema = nomeValidationSchemaBase.required();
const nomeOpcionalValidationSchema = nomeValidationSchemaBase.optional();

// CPF
const cpfPattern = /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/;
const cpfValidationMessages = {
  'string.pattern.base': 'O CPF deve conter 11 caracteres e conter apenas números. Preencha o início com zeros, caso necessário.',
  'string.pattern': 'O CPF deve conter 11 caracteres e conter apenas números. Preencha o início com zeros, caso necessário.',
  'any.required': 'O CPF é obrigatório.'
};
const cpfValidationSchemaBase = Joi.string().pattern(cpfPattern).messages(cpfValidationMessages);
const cpfValidationSchema = cpfValidationSchemaBase.required();
const cpfOpcionalValidationSchema = cpfValidationSchemaBase.optional();

// CNPJ
const cnpjPattern = /\d{2}.?\d{3}.?\d{3}\/?\d{4}-?\d{2}/;
const cnpjValidationMessages = {
  'string.pattern.base': 'O CNPJ deve conter 14 caracteres e conter apenas números. Preencha o início com zeros, caso necessário.',
  'string.pattern': 'O CNPJ deve conter 14 caracteres e conter apenas números. Preencha o início com zeros, caso necessário.',
  'any.required': 'O CNPJ é obrigatório.'
};
const cnpjValidationSchemaBase = Joi.string().pattern(cnpjPattern).messages(cnpjValidationMessages);
const cnpjValidationSchema = cnpjValidationSchemaBase.required();
const cnpjOpcionalValidationSchema = cnpjValidationSchemaBase.optional();

// Senha
const senhaValidationMessages = {
  '*': 'A senha deve conter no mínimo 8 caracteres e incluir, no mínimo, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.'
};
const senhaPattern = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
const senhaValidationSchemaBase = Joi.string().min(8).pattern(senhaPattern).messages(senhaValidationMessages);
const senhaValidationSchema = senhaValidationSchemaBase.required();
const senhaOpcionalValidationSchema = senhaValidationSchemaBase.optional();

// Telefone
const telefonePattern = /(\+\s?\d{1,3}\s?)?(?<!\()(\d{2}|(\(\d{2}\)))\s?\d{4,5}-?\d{4}/;
const telefoneValidationMessages = {
  'string.pattern.base': 'Número de telefone inválido',
  'string.pattern': 'Número de telefone inválido',
  'any.required': 'O telefone é obrigatório.'
};
const telefoneValidationSchemaBase = Joi.string().pattern(telefonePattern).messages(telefoneValidationMessages);
const telefoneValidationSchema = telefoneValidationSchemaBase.required();
const telefoneOpcionalValidationSchema = telefoneValidationSchemaBase.optional();

module.exports = {
  nomeValidationSchema,
  nomeOpcionalValidationSchema,
  cpfValidationSchema,
  cpfOpcionalValidationSchema,
  cnpjValidationSchema,
  cnpjOpcionalValidationSchema,
  senhaValidationSchema,
  senhaOpcionalValidationSchema,
  telefoneValidationSchema,
  telefoneOpcionalValidationSchema,
};
