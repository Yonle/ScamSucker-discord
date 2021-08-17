let get = require("miniget");
let data = [];

async function getData() {
	let recv = await get("https://raw.githubusercontent.com/Yonle/ScamSucker-db/master/scams").text();
  data = recv.split(" ").map(url => {
		if (url.endsWith("\n")) url = url.slice(0, url.length-1);
		return url;
	});
	console.log("Received Scams URL:");
	console.log(" • " + data.join("\n • "));
}

module.exports = (msg, ban, reply, bot) => {
	data.forEach(async url => {
		if (!msg.content.includes(url)) return;
		await bot.sendChannelTyping(msg.channel.id);
		let text = "**__Scam Victims Banned__**\n";
		text += `User Tag: \`${msg.author.username}#${msg.author.discriminator}\`\n`;
		text += `User ID: \`${msg.author.id}\`\n`;
		text += `Triggered URL: \`${url}\` *(NOTE: Do not visit this URL)*\n`;
		text += `\nThis user is automatically banned because the URL that they provide is in Blacklist Database which triggers this bot to ban this user.`;
    await ban(text);
		await reply(text);
		return getData();
	});
}

setInterval(getData, 1000 * 60 * 3);
getData();

require("http").createServer((req, res) => res.end(JSON.stringify(data))).listen(8080);