const express = require('express');
const app = express();
const port = process.env.SYSTEM_PORT || 3333;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => console.log(`Servidor executando na porta ${port}`));
