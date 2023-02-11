import ClientOptions from "./ClientOptions.js";
import { Client, Collection, Partials, GatewayIntentBits } from "discord.js";
import { connect } from "mongoose";
import { join } from "path";
import { readdirSync } from "fs";

export default class Vanely extends Client {
  constructor(options) {
    super(ClientOptions);
    this.commands = new Collection();
    this.loadCommands() 
    this.loadEvents()
  }
  registryCommands() { 
    this.application.commands.set(this.commands) 
  }
  loadCommands(path = 'src/resources/commands') {
         const categories = readdirSync(path)

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)

                this.commands.set(cmd.name, cmd)
            }
        }
    }
  loadEvents(path = 'src/resources/listenerIn') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const events = readdirSync(`${path}/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            
            }
        }
    }

  async connectToDatabase() {
          const start = await connect(process.env.MONGO_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`${chalk.blue(`${Date().toLocaleString('pt-br')}`)} -> MongoDB Logged`)

        this.db = { start, ...Models }
   }
  connect() {
    try {  super.login(process.env.TOKEN)
         console.log(`${chalk.blue(`${Date().toLocaleString('pt-br')}`)} -> Client Vanely Logged`)
     } catch(e) {
      console.log("[API ERROR] " + e)
    }
  }
}