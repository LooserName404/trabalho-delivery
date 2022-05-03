'use strict';

module.exports = {
  async up(queryInterface) {

    await queryInterface.bulkInsert(
      'Cliente',
      [
        {
          nome: 'Velozz',
          cnpj: '09213387000175',
          endereco: 'Rua Alonso Varela, 2901',
        },
        {
          nome: 'Coiote',
          cnpj: '10266456000189',
          endereco: 'Av Presidente Kennedy, 1220',
        },
        {
          nome: 'Nacional',
          cnpj: '11893233000167',
          endereco: 'Rua 24 de Maio, 129',
        },
      ],
      {}
    );

  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Cliente', null, {});
  }
};
