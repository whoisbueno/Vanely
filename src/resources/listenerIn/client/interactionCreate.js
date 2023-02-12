import Event from '../../../base/Event.js';
import Guild from '../../database/models/Guild.js';
import User from '../../database/models/User.js';

export default class InteractionCreateEvent extends Event {
	constructor() {
		super({
			name: 'interactionCreate',
		});
	}

	async run(client, interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		const guild = await Guild.findOne({ idS: interaction.guild.id });
		const user = await User.findOne({ idU: interaction.user.id });

		if (!guild) {
			await Guild.create({ idS: interaction.guild.id });
		}

		if (!user) {
			await User.create({ idU: interaction.user.id });

			interaction.reply({
				content: 'Você não estava registrado no banco de dados, use o comando novamente',
				ephemeral: true,
			});
		}

		if (command.config.autoDefer) await interaction.deferReply({ ephemeral: command.config.ephemeral });

		command.run(interaction);
	}
}
