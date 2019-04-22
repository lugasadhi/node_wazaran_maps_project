'use strict'

const fs = require('fs');
const request = require("request");
const _ = require('lodash');
const log_timestamp = require('log-timestamp')(function() { return new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() + ': ' });
const urlLastgps = 'http://219.83.123.235:8091/locationgps';


setInterval(function() { 
    // Get RPS Daily 
    gpsToFile();
}, 10000);


function gpsToFile(){
    // Get Salesman Location
    request({
        url: urlLastgps,
        json: true 
    }, function (error, response, body) {    
        if (!error && response.statusCode === 200) {
            let data = JSON.stringify(body, null, 2);
            fs.writeFile('./data/gps/lastgps.json', data, (err) => {  
                if (err) throw err;              
            });
        } 
    }); 
}

