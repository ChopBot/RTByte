const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'customCmdDelete' });
	}

	async run(msg, cmdName, executor) {
		if (!msg.guild) return;

		if (msg.guild.settings.get('channels.log') && msg.guild.settings.get('logs.events.customCmdDelete')) await this.serverLog(msg, cmdName, executor);

		return;
	}

	async serverLog(msg, cmdName, executor) {
		const embed = new MessageEmbed()
			.setAuthor(`${cmdName}`, msg.guild.iconURL())
			.setColor(this.client.settings.get('colors.red'))
			.setTimestamp()
			.setFooter(msg.guild.language.get('GUILD_LOG_CUSTOMCMDDELETE', executor), executor.displayAvatarURL());
		const logChannel = await this.client.channels.get(msg.guild.settings.get('channels.log'));
		await logChannel.send('', { disableEveryone: true, embed: embed });
		return;
	}

};
