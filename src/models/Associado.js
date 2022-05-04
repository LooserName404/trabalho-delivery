const Sequelize = require('sequelize');

class Associado extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        senha: Sequelize.STRING,
        endereco: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Cliente, { through: models.ClienteAssociado, foreignKey: 'id_associado' });
    this.hasMany(models.Entrega, { foreignKey: 'id_associado' });
  }
}

module.exports = Associado;
