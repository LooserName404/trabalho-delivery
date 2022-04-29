'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      'Motoboy',
      [
        {
          nome: 'Luiz Henrique Nonato',
          cpf: '334.553.679-09',
          senha: '123456',
          telefone: '(41)99758-8978',
        },
        {
          nome: 'Marcelo Rico Binance',
          cpf: '552.898.777-54',
          senha: '12346',
          telefone: '(41)98166-1923',
        },
        {
          nome: 'José Pedro da Silva',
          cpf: '199.098.123-01',
          senha: '123456',
          telefone: '(41)99690-3090',
        },
      ],
      {}
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Motoboy', null, {});
  }
};
