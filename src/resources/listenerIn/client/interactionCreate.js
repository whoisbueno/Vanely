import Event from '../../../base/Event.js';
import Guild from '../../database/models/Guild.js';
import User from '../../database/models/User.js';
import Command from '../../database/models/Command.js';
import { ButtonBuilder, EmbedBuilder, ActionRowBuilder } from 'discord.js';

export default class InteractionCreateEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'interactionCreate'
    });
  }

  async run(ctx) {
    if (ctx.isCommand()) {
      if (!ctx.guild) return;

      const cmd = this.client.commands.find(c => c.name === ctx.commandName);

      if (cmd) {
        if (cmd.requireDatabase) {
          ctx.guild.db =
            await this.client.db.guilds.findById(ctx.guild.id) ||
            new this.client.db.guilds({ idS: ctx.guild.id });
        }

        const guild = await Guild.findOne({ idS: ctx.guild.id });
        const user = await User.findOne({ idU: ctx.user.id });

        if (!guild) {
          await Guild.create({ idS: ctx.guild.id });
        } else if (!user) {
          await User.create({ idU: ctx.user.id }, { $set: { registrado: true } });

          ctx.reply({ content: "registrado registrado sucesso usa dnv isso", ephemeral: true });
        }

        import lang from `../../languages/${guild.lang}.js`;
        cmd.run(ctx, lang);
      }
    }
  }
}