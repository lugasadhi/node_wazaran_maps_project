'use strict'

const db = require('./../../config/db');
var location;


async function getLocation(){
    db.authenticate().then(() => {
        var newEmp = '';
        var oldEmp = '';
        db.query("exec sp_json_lastsalesman", { type: db.QueryTypes.SELECT})
        .then(
            data => {
                //console.log(data);
                // location = data;
                //console.log(data.length);
                // console.log(data);
                // data.forEach(x => {
                //     newEmp = x.emp_cd; 
                //     if (oldEmp == ''){
                //         oldEmp = x.emp_cd;                
                //     }else{
                //         oldEmp = newEmp;
                //     }
                //     location[newEmp] = [];         
                // });
                // // console.log(location.length);
                // data.forEach(x => {
                //     newEmp = x.emp_cd; 
                //     if (oldEmp == ''){
                //         oldEmp = x.emp_cd;                
                //     }else{
                //         oldEmp = newEmp;
                //     }
                //     location[newEmp].push({emp_cd: x.emp_cd, locdatetime: x.locdatetime, latitude: x.latitude,longitude: x.longitude, status: x.status});        
                // });
                // data.forEach(x => {
                //     location[x.emp_cd] = [];          
                // });
                
                // data.forEach(x => {
                //     location[x.emp_cd].push({emp_cd: x.emp_cd, locdatetime: x.locdatetime, latitude: x.latitude,longitude: x.longitude, status: x.status});      
                // });
                // data.forEach(x => {
                //     location[x.emp_cd]
                //     // .push({emp_cd: x.emp_cd, locdatetime: x.locdatetime, latitude: x.latitude,longitude: x.longitude, status: x.status})         
                // });
                //db.close();
                return data;
                //console.log(location.length);
            }
        )
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

module.exports.location = location
module.exports.getLocation = getLocation
