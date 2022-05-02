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
    this.hasOne(models.Cliente, { foreignKey: "id" })
    this.hasOne(models.Associado, { foreignKey: "id" })
  }
}

module.exports = ClienteAssociado;
