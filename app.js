// Nothing here yet
var forever = require('forever-monitor');
var cfg = require('./config.json');

var mainProcess = new (forever.Monitor)('bot.js', {
	max: 0,
	silent: false,
	killTree: true,
	args: [],
	'logFile': cfg.logPath,
	'outFile': cfg.logPath,
	'errFile': cfg.logPath
});



mainProcess.on('restart', function() {
    console.error('Forever restarting script for ' + child.times + ' time');
});

mainProcess.on('exit:code', function(code) {
    console.error('Forever detected script exited with code ' + code);
    if (code === 2712) {
    	console.log('Cause the bot was requested to be restarted restarting');
    	mainProcess.restart();
    }
});

mainProcess.start();