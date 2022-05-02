const Sequelize = require("sequelize");

class Entrega extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
        valor: Sequelize.DECIMAL,
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
  }
}

module.exports = Entrega;
