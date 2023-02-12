export default class Event {
	constructor(options) {
		this.name = options.name;
	}

	run(client, ...args) {
		return { client, args };
	}
}
