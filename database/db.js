const mongoose = require('mongoose');
const conf = require('../config/db-conf');

mongoose.connect(`mongodb:\/\/${conf.host}/${conf.db}`);

module.exports = mongoose;
