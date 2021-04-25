const express = require('express');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');
const PORT = 3000;

app.listen(PORT, function() {
    console.log('Esta rodando na porta ' + PORT);
});// Está ouvindo o programa na prota 3000


// body parser
app.use(bodyParser.urlencoded({extended: false})); //usar o corpo do body parser no express - urlenconded: padrão de configuração que o pacote indica (border parser)

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

// jobs routes
app.use('/jobs', require('./routes/jobs')); //Declarada a rota para inserção do arquivo