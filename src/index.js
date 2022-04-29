const express = require('express');
const app = express();
const router = require("./routes/router");
const port = process.env.SYSTEM_PORT || 3333;
require("./database");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.listen(port, () => console.log(`Servidor executando na porta ${port}`));
