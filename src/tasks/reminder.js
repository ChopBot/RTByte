const { Task } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Task {

	async run({ guildID, channelID, userID, dmBool, reminderMsg, timestamp }) {
		const guild = this.client.guilds.cache.get(guildID);
		const channel = guild ? await guild.channels.cache.get(channelID) : await this.client.users.cache.get(userID);
		const member = guild ? await guild.members.fetch(userID).catch(() => null) : await this.client.users.cache.get(userID);

		const embed = new MessageEmbed()
			.setAuthor(guild ? member.user.tag : member.tag, guild ? member.user.displayAvatarURL() : member.displayAvatarURL())
			.setColor(this.client.settings.colors.white)
			.setDescription(reminderMsg)
			.setTimestamp(timestamp)
			.setFooter(`Reminder set in ${guild ? channel.name : 'DMs'}${guild ? ` on the ${guild.name} Discord` : ''}`);

		if (dmBool) return member.user.send('', { disableEveryone: true, embed: embed });
		if (channel) return channel.send(`${member}`, { disableEveryone: true, embed: embed });

		return true;
	}

};
