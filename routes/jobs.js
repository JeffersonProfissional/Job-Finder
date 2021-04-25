const express = require('express');
const router = express.Router();            //Objeto de rota do Express
const Job = require('../models/Job');       //Chamando o modelo do banco de dados


//rota de teste
router.get('/test', (req,res) => {
    res.send("deu certo");
});

// detalhe da vaga
router.get('/view/:id', (req, res) => Job.findOne({
    where: {id: req.params.id}
}).then(job => {

    res.render('view', {
        job
    });

}).catch(err => console.log(err)));

router.get('/add', (req,res) => {
    res.render('add');
});

// add job via post
router.post('/add', (req, res) => {

    let {title, salary, company, description, email, new_job} = req.body;

    //insert
    Job.create({
        title,
        salary,
        company,
        description,
        email,
        new_job
    })
    .then(() => res.redirect('/')) //Quando preenchida o formulario, o site é redirecionado ao Home
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;        //Sempre exportar as rotas para que elas sejam usadas em outra parte do código (Fiquei preso neste erro por 1 noite inteira)