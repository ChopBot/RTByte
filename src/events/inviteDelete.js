const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment-timezone');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'inviteDelete' });
	}

	async run(invite) {
		if (invite.guild.available && invite.guild.settings.get('channels.log') && invite.guild.settings.get('logs.events.inviteDelete')) await this.inviteDeleteLog(invite);

		return;
	}

	async inviteDeleteLog(invite) {
		const affirmEmoji = this.client.emojis.get(this.client.settings.get('emoji.affirm'));

		const embed = new MessageEmbed()
			.setAuthor(`discord.gg/${invite.code}`, invite.guild.iconURL())
			.setDescription(invite.url)
			.setColor(this.client.settings.get('colors.red'))
			.addField(invite.channel.type === 'text' ? invite.guild.language.get('CHANNEL') : invite.guild.language.get('VOICE_CHANNEL'),
				invite.channel.type === 'text' ? invite.channel : `${invite.channel.name}`, true)
			.setTimestamp()
			.setFooter(invite.guild.language.get('GUILD_LOG_INVITEDELETE'));

		const logChannel = await this.client.channels.get(invite.guild.settings.get('channels.log'));
		await logChannel.send('', { disableEveryone: true, embed: embed });
		return;
	}

};