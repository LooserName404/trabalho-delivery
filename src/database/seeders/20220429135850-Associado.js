'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const salt = bcrypt.genSaltSync();

    await queryInterface.bulkInsert(
      'Associado',
      [
        {
          nome: 'Superdent',
          cnpj: '13678675000190',
          senha: bcrypt.hashSync('Senhaa1!', salt),
          endereco: 'Rua Pinheiro Souza, 110',
        },
        {
          nome: 'Maramar',
          cnpj: '14336122000112',
          senha: bcrypt.hashSync('Senhaa2@', salt),
          endereco: 'Av Getulio Vargas, 3456',
        },
        {
          nome: 'Boom Digital',
          cnpj: '15118403000119',
          senha: bcrypt.hashSync('Senhaa3#', salt),
          endereco: 'Rua Floriano Peixoto, 445',
        },
      ],
      {}
    );

  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Associado', null, {});
  }
};
