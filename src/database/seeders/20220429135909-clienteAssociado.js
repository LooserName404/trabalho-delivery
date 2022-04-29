'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'clienteAssociado',
      [
        {
          id_associado: 1,
          id_cliente: 2,
        },
        {
          id_associado: 2,
          id_cliente: 3,
        },
        {
          id_associado: 3,
          id_cliente: 1,
        },
      ],
      {}
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clienteAssociado', null, {});
  }
};
