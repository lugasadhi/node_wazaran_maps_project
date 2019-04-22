'use strict'

const fs = require('fs');
const request = require("request");
const db = require('./config/db');
const GeoJSON = require('geojson');
const turf = require('@turf/turf');

const rps = require('./core/rps');
const gps = require('./core/gps');
const notify = require('./core/notifications');



