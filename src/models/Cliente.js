const Sequelize = require("sequelize");

class Cliente extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        endereco: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Associado, { through: models.ClienteAssociado });
    this.hasMany(models.Entrega, { foreignKey: "clienteId" });
  }
}

module.exports = Cliente;
