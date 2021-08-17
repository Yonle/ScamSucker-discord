const detect = require("./scanner.js");
const eris = require("eris");
const bot = new eris(process.env.BOT_TOKEN);

bot.connect();

bot.on('messageCreate', (msg) => {
	if (!msg.channel.guild) return;
	msg.ban = reason => msg.channel.guild.banMember(msg.author.id, 7, reason||"Scammers");
  msg.reply = msg => bot.createMessage(msg.channel.id, msg);

	detect(msg, msg.ban, msg.reply, bot);
});

bot.on('error', console.error);
bot.on('ready', () => console.log("Ready to sucking scam victim"));

process.on('unhandledRejection', console.error);