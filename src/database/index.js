const Sequelize = require("sequelize");
const dbCongif = require("./config/dbconfig");

const Cliente = require("../models/Cliente");
const Associado = require("../models/Associado");
const ClienteAssociado = require("../models/ClienteAssociado");
const Entrega = require("../models/Entrega");
const Motoboy = require("../models/Motoboy");
const connection = new Sequelize(dbCongif);

Cliente.init(connection);
Associado.init(connection);
ClienteAssociado.init(connection);
Motoboy.init(connection);
Entrega.init(connection);

Cliente.associate(connection.models);
Associado.associate(connection.models);
ClienteAssociado.associate(connection.models);
Motoboy.associate(connection.models);
Entrega.associate(connection.models);

module.exports = connection;
