import { readdir } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';
import chalk from 'chalk';
import { Client, Collection } from 'discord.js';
import { connect } from 'mongoose';
import ClientOptions from './ClientOptions.js';

export default class Vanely extends Client {
	constructor() {
		super(ClientOptions);

		this.commands = new Collection();
	}

	async loadCommands(client) {
		const categories = await readdir('./src/resources/interactions');

		for await (const category of categories) {
			const commands = await readdir(`./src/resources/interactions/${category}`);

			for (const command of commands) {
				const { default: CommandClass } = await import(`../resources/interactions/${category}/${command}`);
				const cmd = new CommandClass(client);

				client.commands.set(cmd.name, cmd);
			}
		}
	}

	async loadEvents(client) {
		const categories = await readdir('./src/resources/listenerIn');

		for await (const category of categories) {
			const events = await readdir(`./src/resources/listenerIn/${category}`);

			for (const event of events) {
				const { default: EventClass } = await import(`../resources/listenerIn/${category}/${event}`);
				const evt = new EventClass(client);

				client.on(evt.name, (...args) => evt.run(client, ...args));
			}
		}
	}

	async connectToDatabase() {
		await connect(process.env.MONGO_DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`${chalk.blue(`${new Date().toLocaleString('pt-br')}`)} -> MongoDB Logged`);
	}

	async connect() {
		await sleep(1_000);
		this.loadCommands(this);
		this.loadEvents(this);
		this.connectToDatabase();

		await sleep(2_500);
		super.login(process.env.TOKEN);
	}
}
