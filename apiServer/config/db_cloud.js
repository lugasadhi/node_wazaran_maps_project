'use strict'

const Sequelize = require('sequelize');

const sequelizeCloud = new Sequelize('SBTCDB','sa','sbtc2015', {
    host: '219.83.123.235',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    requestTimeout: 0 

})

module.exports = sequelizeCloud
