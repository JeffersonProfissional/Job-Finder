const express = require('express');
const app = express();
const db = require('./db/connection')

const PORT = 3000;

app.listen(PORT, function() {
    console.log('Esta rodando na porta ' + PORT);
});// Está ouvindo o programa na prota 3000

//db connection
db.authenticate() //Conexão com o banco
.then(() => {
    console.log("Conectou ao banco de Dados");
})//Se der certo (try)
.catch(err => {
    console.log("Ocorreu um Erro ao conectar ", err);
});//Se der errado (catch)


app.get('/', (req, res) => {
    res.send("Funcionando");
});