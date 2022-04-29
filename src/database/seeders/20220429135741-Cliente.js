'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      'Cliente',
      [
        {
          nome: 'Velozz',
          cnpj: '09.213.387/0001-75',
          endereco: 'Rua Alonso Varela, 2901',
        },
        {
          nome: 'Coiote',
          cnpj: '10.266.456/0001-89',
          endereco: 'Av Presidente Kennedy, 1220',
        },
        {
          nome: 'Nacional',
          cnpj: '11.893.233/0001-67',
          endereco: 'Rua 24 de Maio, 129',
        },
      ],
      {}
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cliente', null, {});
  }
};
