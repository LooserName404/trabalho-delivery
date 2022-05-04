const Joi = require('joi');
const { cnpjValidationSchema, cpfValidationSchema } = require('./generalValidation');


const cadastrarEntregaDtoValidationSchema = Joi.object({
  cnpj: cnpjValidationSchema,
  cpf: cpfValidationSchema,
  descricao: Joi.string().required()
});

const atualizarEntregaAssociadoDtoValidationSchema = Joi.object({
  descricao: Joi.string()
});

const atualizarEntregaMotoboyDtoValidationSchema = Joi.object({
  status: Joi.string().valid('finalizada'),
  valor: Joi.number()
});

module.exports = {
  cadastrarEntregaDtoValidationSchema,
  atualizarEntregaAssociadoDtoValidationSchema,
  atualizarEntregaMotoboyDtoValidationSchema
};
