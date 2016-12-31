var cfg = require('./config.json');
var Discord = require('discord.js');
var client = new Discord.Client();
client.on('ready', () => { 
    client.user.setGame("myself | "+cfg.prefix+"help");
    console.log('YuumaMute is ready!');
});
client.on('message', message => {
	if (message.content.startsWith(cfg.prefix+"help")){
		message.channel.sendMessage("Avaliable commands for YuumaMute:").then(message.channel.sendCode("txt", cfg.prefix+'help\n'+cfg.prefix+'mute <mention>\n'+cfg.prefix+'unmute <mention>\n'+cfg.prefix+'greet <mention>\n'+cfg.prefix+'shutdown'));
	}else if (message.content.startsWith(cfg.prefix+"robotrevolution")){
		message.reply("NO.");
	}else if (message.content.startsWith(cfg.prefix+"roleid")){
        message.mentions.roles.array().forEach(function (item, index){
                message.channel.sendMessage('Role ID: '+item.id);
            });
    }
    if (message.member.roles.has("id", cfg.adminRoleID) || message.author.id === cfg.ownerID ) {
        if (message.content.startsWith(cfg.prefix+"mute")) {
	    	message.mentions.users.array().forEach(function (item, index){
                message.guild.fetchMember(item).then(function(member){member.addRole(cfg.muteRoleID)});
                message.channel.sendMessage('Muted '+item.id);
				console.log(Date.now()+' '+message.author.id+' issued mute commmand for '+item.id);
        	});
        }else if (message.content.startsWith(cfg.prefix+"unmute")) {
            message.mentions.users.array().forEach(function (item, index) {
	    		message.guild.fetchMember(item).then(function(member){member.removeRole(cfg.muteRoleID)});
				message.channel.sendMessage('Unmuted '+item.id);
				console.log(Date.now()+' '+message.author.id+' issued unmute commmand for '+item.id);
   			});
        }else if (message.content.startsWith(cfg.prefix+"shutdown")) {
            message.channel.sendMessage("Bye! :heart:");
			console.log(Date.now()+' '+message.author.id+' issued shutdown command');
            console.log('Shutting down...');
            client.destroy();
        }else if (message.content.startsWith(cfg.prefix+"restart")){
            message.channel.sendMessage("Brb... :wave:");
            console.log(Date.now()+' '+message.author.id+' issued shutdown command');
            console.log('Shutting down...');
            process.exitCode = 170;
            client.destroy();
        }else if (message.content.startsWith(cfg.prefix+"greet")) {
			message.delete();
			message.mentions.users.array().forEach(function (item, index){
                message.channel.sendMessage("Hello, "+item.username+"! :heart:");
				console.log(Date.now()+' '+message.author.id+' issued greet commmand for '+item.id);
        	});
		}
    }else if (message.member.roles.has("id", cfg.muteRoleID)) {
        message.delete()
            .then( console.log(Date.now()+' Deleted message from '+message.author))
            .catch(console.error);
    }
});
client.login(cfg.discordToken);
