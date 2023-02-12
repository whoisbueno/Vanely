import Command from '../../../base/Command.js';

export default class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			description: 'Returns pong',
		});

		this.config = {
			ephemeral: false,
			autoDefer: true,
			requireDatabase: false,
		};
	}

	run(interaction) {
		interaction.editReply({ content: `Pong! ${this.client.ws.ping}ms` });
	}
}
