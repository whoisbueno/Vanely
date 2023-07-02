import Command from '../../../base/Command.js';

export default class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			description: 'Returns pong',
		});
	}

	async run(interaction) {
		interaction.editReply({ content: `Pong! ${this.client.ws.ping}ms` });
	}
}
