const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'roleDelete' });
	}

	async run(role) {
		if (!role.guild) return;

		let executor;
		if (role.guild.me.hasPermission('VIEW_AUDIT_LOG')) {
			const auditLog = await role.guild.fetchAuditLogs();
			const logEntry = await auditLog.entries.first();

			if (logEntry.action === 'ROLE_DELETE') executor = logEntry ? logEntry.executor : undefined;
		}

		if (role.guild.settings.channels.log && role.guild.settings.logs.events.roleDelete) await this.serverLog(role, executor);

		return;
	}

	async serverLog(role, executor) {
		const embed = new MessageEmbed()
			.setAuthor(`${role.name}`, role.guild.iconURL())
			.setColor(this.client.settings.colors.red)
			.setTimestamp()
			.setFooter(role.guild.language.get('GUILD_LOG_ROLEDELETE', executor), executor ? executor.displayAvatarURL() : undefined);

		if (role.guild.settings.logs.verboseLogging) {
			embed.addField(role.guild.language.get('ID'), role.id, true);
		}

		const logChannel = await this.client.channels.cache.get(role.guild.settings.channels.log);
		await logChannel.send('', { disableEveryone: true, embed: embed });
		return;
	}

};
