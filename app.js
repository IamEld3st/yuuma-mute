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
    console.log('[Bootstrap] Forever restarting script for ' + mainProcess.times + ' time');
});

mainProcess.on('exit:code', function(code) {
    console.log('[Bootstrap] Forever detected script exited with code ' + code);
    if (code === 12) {
    	console.log('[Bootstrap] Bot was requested to be restarted therefore restarting...');
    	mainProcess.restart();
    }else if (code === 13) {
    	console.log('[Bootstrap] Update request therefore pulling newest code from "master" and restarting...');
    	require('simple-git')()
         .pull()
         .then(function() {
            console.log('pull done.');
			mainProcess.restart();
         });
    }else if (code === 14) {
    	console.log('[Bootstrap] Update request therefore pulling newest code from "development" and restarting...');
    	require('simple-git')()
         .pull('origin','dev')
         .then(function() {
            console.log('pull done.');
			mainProcess.restart();
         });
    }else{main.mainProcess.kill();}
});

mainProcess.start();
console.log('[Bootstrap] Bot Started!');