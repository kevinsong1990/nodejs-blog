var winston = require('winston');
var config  = require('./../config.json');

// log config
var log = new (winston.Logger)({
	transports : [
	new (winston.transports.File)({
		filename : config.log.filename,
		dirname  : config.log.path,
		maxsize  : config.log.maxsize,
		maxFiles : config.log.maxFiles,
        level    : config.log.level,
		json : false
	})]
});

// export
module.exports = log;
