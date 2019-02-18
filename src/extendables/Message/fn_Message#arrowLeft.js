const { Extendable, KlasaMessage } = require('klasa');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: [KlasaMessage] });
	}

	async arrowLeft(message = null, messageOptions = {}) {
		const arrowLeftEmoji = await this.client.emojis.get(this.client.settings.emoji.arrowLeft);
		await this.react(arrowLeftEmoji);
		return message ? this.sendMessage(`${this.author}\n${arrowLeftEmoji}${message}`, messageOptions) : this;
	}

};
