'use strict'

const fs = require('fs');
const request = require("request");
const localDb = require('./../../config/db_local');
const cloudDb = require('./../../config/db_cloud');
const GeoJSON = require('geojson');
const turf = require('@turf/turf');

const urlLastgps = 'http://219.83.123.235:8091/locationgps';
const dirArea = '../../../data/area_rps/'
var datagps = '';
var notification = '';

// db.authenticate().then(() => {
//     db.query("exec sp_get_rpsdaily ", { type: db.QueryTypes.SELECT})
//     .then(
//         data => {
//             data.forEach(data => {
//                 sequelize.query("UPDATE users SET y = 42 WHERE x = 12").then(([results, metadata]) => {
//                     // Results will be an empty array and metadata will contain the number of affected rows.
//                   })
//             });
//             //db.close();
//         }
//     )
// }).catch(err => {
//     console.error('Unable to connect to the database:', err);
// });

setInterval(function() { 
    // Get GPS Location 
    request({
        url: urlLastgps,
        json: true 
    }, function (error, response, body) {
    
        if (!error && response.statusCode === 200) {
            let data = JSON.stringify(body, null, 2);
            datagps = data;
        } 
    });

    fs.writeFile('./data/gps/location.json', datagps, (err) => {  
        if (err) throw err;            
    });

}, 10000);


// setInterval(function() { 
//     // Get GPS Location & Calculate the Area 
//     request({
//         url: urlLastgps,
//         json: true 
//     }, function (error, response, body) {    
//         if (!error && response.statusCode === 200) {
//             let data = JSON.stringify(body, null, 2);
//             datagps = data;
//             console.log(data);
//             // for (var dt in datagps){
//             //     if(dt.emp_cd == '0024'){
//             //         console.log(dt.emp_cd);
//             //         fs.readFile(dirName + dt.emp_cd + '.geojson', 'utf-8', (err, content) => {
//             //             if (err) {
//             //               console.log(err);
//             //               return;
//             //             }
//             //             console.log(content);
//             //         });
//             //     }
//             // }
//         } 
//     });
// }, 10000);

// setInterval(function() {     
//     localDb.authenticate().then(() => {
//         var newEmp = '';
//         var oldEmp = '';
//         var salesData = []
//         localDb.query("exec sp_get_rpsdaily", { type: db.QueryTypes.SELECT})
//         .then(data => {
//             data.forEach(x => {
//                 newEmp = x.emp_cd; 
//                 if (oldEmp == ''){
//                     oldEmp = x.emp_cd;                
//                 }else{
//                     oldEmp = newEmp;
//                 }
//                 salesData[newEmp] = [];          
//             });
//             data.forEach(x => {
//                 newEmp = x.emp_cd; 
//                 if (oldEmp == ''){
//                     oldEmp = x.emp_cd;                
//                 }else{
//                     oldEmp = newEmp;
//                 }
//                 salesData[newEmp].push({emp_cd: newEmp, lat: x.latitude, lng: x.longitude});            
//             });
//             for (var k in salesData) {
//                 fs.writeFileSync('../../../data/area_rps/'+k+'.geojson', JSON.stringify(turf.convex(turf.buffer(GeoJSON.parse(salesData[k], {Point: ['lat', 'lng'], include: ['emp_cd']}), 1, {units: 'kilometers'} )) ));
//             }
//         })
//     }).catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// }, 600000);


