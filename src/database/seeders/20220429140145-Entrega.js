'use strict';

module.exports = {
  async up(queryInterface) {

    await queryInterface.bulkInsert(
      'Entrega',
      [
        {
          descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry a standard dummy text ever since the 1500s, when an unknown',
          valor: 100,
          status: 'pendente',
          id_motoboy: 1,
          id_associado: 2,
          id_cliente: 1,

        },
        {
          descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry a standard dummy text ever since the 1500s, when an unknown',
          valor: 200,
          status: 'pendente',
          id_motoboy: 2,
          id_associado: 3,
          id_cliente: 2,
        },
        {
          descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry a standard dummy text ever since the 1500s, when an unknown',
          valor: 300,
          status: 'finalizada',
          id_motoboy: 3,
          id_associado: 1,
          id_cliente: 3,
        },
      ],
      {}
    );

  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Entrega', null, {});
  }
};
