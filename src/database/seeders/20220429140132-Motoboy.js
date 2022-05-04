'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const salt = bcrypt.genSaltSync();

    await queryInterface.bulkInsert(
      'Motoboy',
      [
        {
          nome: 'Luiz Henrique Nonato',
          cpf: '33455367909',
          senha: bcrypt.hashSync('Senhaa1!', salt),
          telefone: '(41)99758-8978',
        },
        {
          nome: 'Marcelo Rico Binance',
          cpf: '55289877754',
          senha: bcrypt.hashSync('Senhaa2@', salt),
          telefone: '(41)98166-1923',
        },
        {
          nome: 'José Pedro da Silva',
          cpf: '19909812301',
          senha: bcrypt.hashSync('Senhaa3#', salt),
          telefone: '(41)99690-3090',
        },
      ],
      {}
    );

  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Motoboy', null, {});
  }
};
