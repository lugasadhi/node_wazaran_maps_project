'use strict'

const db = require('./../../config/db');
const salesData = [];

function getRps(){
    db.authenticate().then(() => {
        var newEmp = '';
        var oldEmp = '';
        db.query("exec sp_get_rpsdaily", { type: db.QueryTypes.SELECT})
        .then(
            data => {
                return data;
                // data.forEach(x => {
                //     newEmp = x.emp_cd; 
                //     if (oldEmp == ''){
                //         oldEmp = x.emp_cd;                
                //     }else{
                //         oldEmp = newEmp;
                //     }
                //     salesData[newEmp] = [];
                //     //.push({emp_cd: newEmp, lat: x.latitude, lng: x.longitude});            
                // });
                // data.forEach(x => {
                //     newEmp = x.emp_cd; 
                //     if (oldEmp == ''){
                //         oldEmp = x.emp_cd;                
                //     }else{
                //         oldEmp = newEmp;
                //     }
                //     salesData[newEmp].push({emp_cd: newEmp, lat: x.latitude, lng: x.longitude});            
                // });
                // db.close();
            }
        )
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

// module.exports.salesData = salesData
module.exports.getRps = getRps
