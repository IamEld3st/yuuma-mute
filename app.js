// Nothing here yet
var forever = require('forever-monitor');
var cfg = require('./config.json');

var mainProcess = new (forever.Monitor)('bot.js', {
	max: 3,
	silent: false,
	args: [],
	'logFile': cfg.logPath,
    'outFile': cfg.logPath,
    'errFile': cfg.logPath
});

mainProcess.on('exit', function () {
	console.log('Exited after 3 restarts');
});

mainProcess.start();