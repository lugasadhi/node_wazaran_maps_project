'use strict'

const db = require('./../../config/db');
var location;


async function getLocation(){
    db.authenticate().then(() => {
        db.query("exec sp_json_salespoint", { type: db.QueryTypes.SELECT})
        .then(
            data => {
                return data;
            }
        )
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

module.exports.getLocation = getLocation
