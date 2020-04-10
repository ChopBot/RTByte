const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment-timezone');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'inviteCreate' });
	}

	async run(invite) {
		if (!invite.guild) return;

		if (invite.guild.settings.channels.log && invite.guild.settings.logs.events.inviteCreate) await this.serverLog(invite);

		return;
	}

	async serverLog(invite) {
		const affirmEmoji = this.client.emojis.get(this.client.settings.emoji.affirm);

		const embed = new MessageEmbed()
			.setAuthor(`discord.gg/${invite.code}`, invite.guild.iconURL())
			.setDescription(invite.url)
			.setColor(this.client.settings.colors.green)
			.addField(invite.channel.type === 'text' ? invite.guild.language.get('CHANNEL') : invite.guild.language.get('VOICE_CHANNEL'),
				invite.channel.type === 'text' ? invite.channel : `${invite.channel.name}`, true)
			.setTimestamp()
			.setFooter(invite.guild.language.get('GUILD_LOG_INVITECREATE', invite.inviter), invite.inviter.displayAvatarURL());

		if (invite.maxAge) {
			embed.addField(invite.guild.language.get('GUILD_LOG_INVITECREATE_EXPIRYTIME'), moment.duration(invite.maxAge, 's').humanize(), true)
				.addField(invite.guild.language.get('GUILD_LOG_INVITECREATE_EXPIRYTIMESTAMP'),
					moment.tz(invite.expiresTimestamp, invite.guild.settings.timezone).format('Do MMMM YYYY, h:mmA zz'));
		}

		if (invite.maxUses) {
			embed.addField(invite.guild.language.get('GUILD_LOG_INVITECREATE_MAXUSES'), invite.maxUses, true);
		}

		if (invite.temporary) {
			embed.addField(invite.guild.language.get('GUILD_LOG_INVITECREATE_TEMPORARY'), affirmEmoji, true);
		}

		const logChannel = await this.client.channels.get(invite.guild.settings.channels.log);
		await logChannel.send('', { disableEveryone: true, embed: embed });
		return;
	}

};
