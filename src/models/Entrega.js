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
    this.hasMany(models.Motoboy, { foreignKey: "motoboyId" });
    this.hasMany(models.Associado, { foreignKey: "associadoId" });
    this.hasMany(models.Cliente, { foreignKey: "clienteId" });
  }
}

module.exports = Entrega;
