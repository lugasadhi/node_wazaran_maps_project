'use strict'

const fs = require("fs");
const db = require('../../config/db_local');
const cloud = require('../../config/db_cloud');


exports.list_all_lastlocation = function(req, res){
    cloud.authenticate().then(() => {
        cloud.query("exec sp_json_lastgps", { type: db.QueryTypes.SELECT})
        .then(
            data => {
                res.json(data);
                //cloud.close();
            }
        )
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

exports.list_all_branch = function(req, res){
    db.authenticate().then(() => {
        db.query("exec sp_json_salespoint", { type: db.QueryTypes.SELECT})
        .then(
            data => {
                res.json(data);
            }
        )
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

exports.list_all_customer = function(req, res){
    db.authenticate().then(() => {
        db.query("exec sp_json_infocustomer", { type: db.QueryTypes.SELECT})
        .then(
            data => {
                res.json(data);
            }
        )
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

