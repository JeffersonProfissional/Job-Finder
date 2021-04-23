const {Router} = require('express');
const Sequelize = require('sequelize');
const db = require('../db/connection');

const Job = db.define('job', {
    title: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.STRING,
    },
    company: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    new_job: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Job;           //Sempre exportar para ser usado em outras partes do código