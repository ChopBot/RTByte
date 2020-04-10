const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'guildBoostRemove' });
	}

	async run(member) {
		if (!member.guild.settings.channels.log && !member.guild.settings.logs.events.guildBoostRemove) return;

		const embed = new MessageEmbed()
			.setAuthor(`${member.displayName} (${member.user.tag}) `, member.user.displayAvatarURL())
			.setTimestamp()
			.setFooter(member.guild.language.get('GUILD_LOG_BOOSTREMOVE'));

		const logChannel = await this.client.channels.cache.get(member.guild.settings.channels.log);
		await logChannel.send('', { disableEveryone: true, embed: embed });
		return;
	}

};
