const Sequelize = require('sequelize');

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
    this.hasOne(models.Associado, { foreignKey: 'id' });
    this.hasOne(models.Cliente, { foreignKey: 'id' });
    this.hasOne(models.Motoboy, { foreignKey: 'id' });
  }
}

module.exports = Entrega;
