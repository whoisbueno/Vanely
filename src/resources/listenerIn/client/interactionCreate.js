import Event from '../../../base/Event';
import Guild from '../../database/models/Guild';
import User from '../../database/models/User';
import Command from '../../database/models/Command';
import { ButtonBuilder, EmbedBuilder, ActionRowBuilder } from 'discord.js';

export default class InteractionCreateEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'interactionCreate'
    });
  }

  async run(interaction) {
    const ctx = interaction;
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

        const lang = require(`../../languages/${guild.lang}`);
        cmd.run(ctx, lang);
      }
    }
  }
}