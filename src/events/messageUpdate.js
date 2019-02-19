const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'messageUpdate'	});
	}

	async run(old, msg) {
		if (this.client.ready && !old.partial && old.content !== msg.content) this.client.monitors.run(msg);

		if (msg.guild && old.content !== msg.content) await this.editLog(old, msg);

		return;
	}

	async editLog(old, msg) {
		if (!msg.guild.settings.logs.events.messageUpdate) return;

		const embed = new MessageEmbed()
			.setAuthor(`#${msg.channel.name}`, msg.guild.iconURL())
			.setColor(this.client.settings.colors.blue)
			.setTitle(msg.guild.language.get('GUILD_LOG_MESSAGEUPDATE'))
			.addField(msg.guild.language.get('GUILD_LOG_BEFORE'), old.cleanContent)
			.addField(msg.guild.language.get('GUILD_LOG_AFTER'), msg.cleanContent)
			.setTimestamp()
			.setFooter(msg.author.tag, msg.author.displayAvatarURL());

		const logChannel = await this.client.channels.get(msg.guild.settings.channels.log);
		await logChannel.send('', { disableEveryone: true, embed: embed });
		return;
	}

};
