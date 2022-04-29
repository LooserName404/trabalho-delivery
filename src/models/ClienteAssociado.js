const Sequelize = require("sequelize");

class ClienteAssociado extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {

      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Cliente, { foreignKey: "clienteId" });
    this.hasMany(models.Associado, { foreignKey: "associadoId" });
  }
}

module.exports = ClienteAssociado;
