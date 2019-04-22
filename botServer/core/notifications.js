'use strict'

const fs = require('fs');
var turf = require('@turf/turf');
const cmd = require('../lib/cmd');
const db = require('../config/db');

const gpsFile = './data/gps/lastgps.json';
const areaDir = './data/area_rps/';


fs.watchFile(gpsFile, function(event, fileName) { 
    var pt = '', poly = '';
    var inArea = false;
    fs.readFile(gpsFile, function(err, data) { 
        if (cmd.IsJsonString(data)){
            var gps = JSON.parse(data); 
            for (var k in gps) {     
                if (gps[k].emp_cd != null){
                    if (fs.existsSync(areaDir + gps[k].emp_cd + '.geojson')) {
                        var area = fs.readFileSync(areaDir + gps[k].emp_cd + '.geojson', 'utf8');
                        area = JSON.parse(area);                                                        
                        pt = turf.point([gps[k].longitude, gps[k].latitude]);
                        poly = turf.polygon(area.geometry.coordinates);
                        inArea = turf.booleanPointInPolygon(pt, poly);
                        db.query(
                            "exec sp_tmaps_notification '" + gps[k].emp_cd +"','AREA','OUT OF AREA RPS';",
                            { type: db.QueryTypes.INSERT }
                        ).then(function (clientInsertId) {
                            // console.log(clientInsertId);
                            console.log(gps[k].emp_cd + ' : ' + inArea);
                        });
                    }         
                }                  
            }
        }
    });    
});
