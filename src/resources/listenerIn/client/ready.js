import chalk from 'chalk';
import Event from '../../../base/Event.js';

export default class ReadyEvent extends Event {
	constructor() {
		super({
			name: 'ready',
		});
	}

	run(client) {
		console.log(`${chalk.blue(`${new Date().toLocaleString('pt-br')}`)} -> Client Vanely Logged`);

		client.application.commands.set(client.commands);
	}
}
