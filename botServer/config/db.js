'use strict'

const Sequelize = require('sequelize');

const sequelize = new Sequelize('SBTCDB','sa','sbtc2015', {
    host: '172.16.1.18',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

})

module.exports = sequelize