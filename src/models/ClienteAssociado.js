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
  }
}

module.exports = ClienteAssociado;
