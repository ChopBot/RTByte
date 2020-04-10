const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			aliases: ['sendmessage', 'message', 'msg', 'echo'],
			permissionLevel: 6,
			description: language => language.get('COMMAND_SENDMSG_DESCRIPTION'),
			extendedHelp: '',
			usage: '<targetUser:username|targetChannel:channelname> <message:...string>',
			usageDelim: ' '
		});
		this.customizeResponse('targetUser', message => message.language.get('COMMAND_SENDMSG_NOPARAM_TARGET'))
			.customizeResponse('message', message => message.language.get('COMMAND_SENDMSG_NOPARAM_MSG'));
	}

	async run(msg, [target, ...message]) {
		if (await this.canSend(msg, target)) {
			try {
				await msg.delete();
				if (target.constructor.name !== 'KlasaUser') {
					return target.send(message);
				} else if (target.constructor.name === 'KlasaUser') {
					// eslint-disable-next-line max-len
					return target.send(`${message}\n\n${msg.language.get('COMMAND_SENDMSG_DISCLAIMER', msg.guild)}`);
				}
				return target.send(message);
			} catch (err) {
				await this.client.emit('taskError', err);
				return msg.reject();
			}
		}
		return msg.delete();
	}

	async canSend(msg, target) {
		if (target.constructor.name === 'TextChannel') {
			return target.guild === msg.guild;
		}

		if (target.constructor.name === 'KlasaUser') {
			return await msg.guild.members.cache.has(target.id);
		}

		return false;
	}

};
