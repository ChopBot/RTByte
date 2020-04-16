const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pinned', 'pins'],
			description: language => language.get('COMMAND_PIN_DESCRIPTION'),
			runIn: ['text']
		});
	}

	async run(msg) {
		if (!msg.guild.settings.get('boards.pinboard.pinboardEnabled')) return msg.send(msg.language.get('COMMAND_PIN_PINBOARD_NOT_ENABLED'));

		let attachment;
		const pinnedMessages = msg.guild.settings.get('boards.pinboard.pinned');
		if (!pinnedMessages) return msg.send(msg.language.get('COMMAND_PIN_NOPINNED'));
		const selected = pinnedMessages[Math.floor(Math.random() * pinnedMessages.length)];
		const { msgID, channelID, pinner } = selected;

		const channel = await msg.guild.channels.get(channelID);
		const fetchedPin = await channel.messages.fetch(msgID);
		const fetchedPinner = await this.client.users.get(pinner);

		const embed = new MessageEmbed()
			.setAuthor(msg.language.get('COMMAND_PIN_PINNED'), msg.guild.iconURL())
			.setColor(fetchedPin.member.highestRole ? fetchedPin.member.highestRole.color : this.client.settings.get('colors.white'))
			.setDescription(`[${msg.guild.language.get('CLICK_TO_VIEW')}](${fetchedPin.url})`)
			.addField(msg.language.get('BOARD_AUTHOR'), fetchedPin.author, true)
			.addField(msg.language.get('CHANNEL'), channel, true)
			.setThumbnail(fetchedPin.author.displayAvatarURL())
			.setTimestamp(fetchedPin.createdTimestamp)
			.setFooter(msg.language.get('PINBOARD_PINNED_BY', fetchedPinner), fetchedPinner ? fetchedPinner.displayAvatarURL() : undefined);

		if (fetchedPin.content) await embed.addField(msg.guild.language.get('MESSAGE'), fetchedPin.content);
		if (fetchedPin.attachments.size > 0) {
			attachment = fetchedPin.attachments.map(atch => atch.url).join(' ');
			attachment = attachment
				.replace('//cdn.', '//media.')
				.replace('.com/', '.net/');
			await embed.setImage(attachment);
		}

		return msg.send('', { disableEveryone: true, embed: embed });
	}

};
