const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'roleDelete' });
	}

	async run(role) {
		if (role.guild.available && role.guild.settings.logs.events.roleDelete) await this.roleDeleteLog(role);

		return;
	}

	async roleDeleteLog(role) {
		const embed = new MessageEmbed()
			.setAuthor(`${role.name}`, role.guild.iconURL())
			.setColor(this.client.settings.colors.red)
			.setTimestamp()
			.setFooter(role.guild.language.get('GUILD_LOG_ROLEDELETE'));

		if (role.guild.settings.logs.verboseLogging) {
			embed.addField(role.guild.language.get('GUILD_LOG_ROLEDELETE_V_ID'), role.id, true);
		}

		const logChannel = await this.client.channels.get(role.guild.settings.channels.log);
		await logChannel.send('', { disableEveryone: true, embed: embed });
		return;
	}

};
