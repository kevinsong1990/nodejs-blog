var winston = require('winston');
var os      = require('os');
var config  = require('./../config.json');

// we need to choose different log path for different platform
var platform = os.platform();

// log config
var log;
if (platform.indexOf("win") != -1) {
    log = new (winston.Logger)({
	    transports : [
	    new (winston.transports.File)({
		    filename : config.log.filename,
		    dirname  : config.log.path.windows,
		    maxsize  : config.log.maxsize,
		    maxFiles : config.log.maxFiles,
            level    : config.log.level,
		    json : false
	    })]
    });
}
else {
    log = new (winston.Logger)({
	    transports : [
	    new (winston.transports.File)({
		    filename : config.log.filename,
		    dirname  : config.log.path.linux,
		    maxsize  : config.log.maxsize,
		    maxFiles : config.log.maxFiles,
            level    : config.log.level,
		    json : false
	    })]
    });
}

// export
module.exports = log;
