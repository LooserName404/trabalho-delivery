"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("clienteAssociado", {
      id_associado: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: "Associado", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: "Cliente", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("clienteAssociado");
  },
};
