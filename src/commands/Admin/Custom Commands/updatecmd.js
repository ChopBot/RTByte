const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['updcmd', 'changecmd', 'updatecommand', 'changecommand', 'editcmd'],
			permissionLevel: 6,
			requiredSettings: ['commands.customCommandsEnabled'],
			description: language => language.get('COMMAND_UPDATECMD_DESCRIPTION'),
			usage: '<name:string> <content:...string>',
			usageDelim: ' '
		});
		this.customizeResponse('name', msg =>
			msg.language.get('COMMAND_UPDATECMD_NOPARAM_NAME'));
		this.customizeResponse('content', msg =>
			msg.language.get('COMMAND_UPDATECMD_NOPARAM_CONTENT'));
	}

	async run(msg, [name, ...content]) {
		if (!msg.guild.settings.get('commands.customCommandsEnabled')) return msg.reject(msg.language.get('COMMAND_UPDATECMD_NOTENABLED'));

		name = name.toLowerCase();
		if (this.client.commands.has(name)) return msg.reject(msg.language.get('COMMAND_CUSTOM_CMD_NATIVE', name));
		// eslint-disable-next-line id-length
		const cmd = msg.guild.settings.get('commands.customCommands').find(c => c.name.toLowerCase() === name);
		if (cmd) {
			const oldCmd = cmd;
			const remove = await msg.guild.settings.update('commands.customCommands', cmd, { action: 'remove' });
			const add = await msg.guild.settings.update('commands.customCommands', { name: cmd.name, content: content.join(' ') }, { action: 'add' });
			if (add.errors.length || remove.errors.length) return msg.reject(msg.language.get('COMMAND_UPDATECMD_ERROR', name));
			this.client.emit('customCmdUpdate', msg, name, content, oldCmd, msg.author);
			return msg.affirm();
		} else {
			return msg.reject(msg.language.get('COMMAND_CUSTOM_CMD_NOT_EXIST', name));
		}
	}

};
