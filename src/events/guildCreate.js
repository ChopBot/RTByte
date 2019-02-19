const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'guildCreate' });
	}

	async run(guild) {
		if (!guild.available) return;
		if (this.client.settings.guildBlacklist.includes(guild.id)) {
			guild.leave();
			this.client.emit('warn', `Blacklisted guild detected: ${guild.name} (${guild.id})`);
		}

		await guild.rtbyteInit();

		if (this.client.settings.logs.guildCreate) await this.guildCreateLog(guild);

		return;
	}

	async guildCreateLog(guild) {
		const embed = new MessageEmbed()
			.setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
			.setColor(this.client.settings.colors.green)
			.setTimestamp()
			.setFooter(guild.language.get('GLOBAL_LOG_GUILDCREATE'));

		const globalLogChannel = await this.client.channels.get(this.client.settings.channels.globalLog);
		await globalLogChannel.send('', { disableEveryone: true, embed: embed });
		return;
	}

};
