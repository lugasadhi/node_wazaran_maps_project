'use strict'

const fs = require('fs');
const request = require("request");
const _ = require('lodash');
const GeoJSON = require('geojson');
const turf = require('@turf/turf');
const log_timestamp = require('log-timestamp')(function() { return new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() + ': ' });

const db = require('../config/db');

setInterval(function() { 
    // Get RPS Daily 
    rpsToFile();
}, 600000);

function rpsToFile(){
    db.authenticate().then(() => {
    var newEmp = '';
    var oldEmp = '';
    var salesData = []
    db.query("exec sp_get_rpsdaily", { type: db.QueryTypes.SELECT})
    .then(data => {
        data.forEach(x => {
            newEmp = x.emp_cd; 
            if (oldEmp == ''){
                oldEmp = x.emp_cd;                
            }else{
                oldEmp = newEmp;
            }
            salesData[newEmp] = [];       
        });
        data.forEach(x => {
            newEmp = x.emp_cd; 
            if (oldEmp == ''){
                oldEmp = x.emp_cd;                
            }else{
                oldEmp = newEmp;
            }
            salesData[newEmp].push({emp_cd: newEmp, lat: x.latitude, lng: x.longitude});            
        });
        for (var k in salesData) {
            fs.writeFileSync('./data/area_rps/'+k+'.geojson', JSON.stringify(turf.convex(turf.buffer(GeoJSON.parse(salesData[k], {Point: ['lat', 'lng'], include: ['emp_cd']}), 1, {units: 'kilometers'} )) ));
        }
    })
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
}

function rpsToDatabase(){

}
