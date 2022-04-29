'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      'Associado',
      [
        {
          nome: 'Superdent',
          cnpj: '13.678.675/0001-90',
          senha: '123456',
          endereco: 'Rua Pinheiro Souza, 110',
        },
        {
          nome: 'Maramar',
          cnpj: '14.336.122/0001-12',
          senha: '12346',
          endereco: 'Av Getulio Vargas, 3456',
        },
        {
          nome: 'Boom Digital',
          cnpj: '15.118.403/0001-19',
          senha: '123456',
          endereco: 'Rua Floriano Peixoto, 445',
        },
      ],
      {}
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Associado', null, {});
  }
};
