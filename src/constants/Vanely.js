import ClientOptions from "./ClientOptions";
import { Client, Collection, Partials, GatewayIntentBits } from "discord.js";
import { connect } from "mongoose";
import { join } from "path";
import { readdirSync } from "fs";

class Vanely extends Client {
  constructor(options) {
    super({
      intents: [
GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildInvites,
      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
      ],
    });
  this.commands = new Collection();
  this.loadSlashCommands() 
  this.loadEvents() 
  }
}
export default Vanely;