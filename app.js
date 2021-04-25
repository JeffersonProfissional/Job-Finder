const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const PORT = 3000;
const Job = require("./models/Job");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.listen(PORT, function() {
    console.log('Esta rodando na porta ' + PORT);
});                                                         // Está ouvindo o programa na prota 3000

// handle bars
app.set('views', path.join(__dirname, 'views'));            //Vai facilitar a dinamica de tamplates da pagina  - Vai entender o diretorio base dqa aplicação
app.engine('handlebars', exphbs({defaultLayout: 'main'}));  //Especificando o arquivo principal
app.set('view engine', 'handlebars');                       //Especificando a framework ou biblioteca que vai ser utilizado pra renderizer as views

// static folder
app.use(express.static(path.join(__dirname, 'public')));

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

//routes
app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%'+search+'%'; // PH = PHP, Full = FullStack, Front = FrontEnd

    if(!search){
    
        Job.findAll({order: [                   //Encontra as Jobs salvas no banco
            ['createdAt', 'DESC']               //DESC faz com que haja uma ordem do mais novo ao mais velho dos registros no BD
        ]})
        .then( jobs => {
            res.render('index', {
                jobs                            // Indica o parametro para a View
            });
        })
        .catch(err => console.log(err)); 

    }else{
        Job.findAll({
        where:{
            title: {[Op.like]: query
        }},

        order: [                   //Encontra as Jobs salvas no banco
            ['createdAt', 'DESC']               //DESC faz com que haja uma ordem do mais novo ao mais velho dos registros no BD
        ]})

        .then( jobs => {

            res.render('index', {
                jobs, search                            // Indica o parametro para a View
            });

        })                   
        .catch(err => console.log(err));
    }

});

// jobs routes
app.use('/jobs', require('./routes/jobs')); //Declarada a rota para inserção do arquivo