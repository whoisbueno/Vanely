import { Schema, model } from 'mongoose';

const guildSchema = new Schema({
  idS: {
    type: String
  },
  lang: {
    type: String,
    default: 'pt-BR'
  }
});

export default model('Guilds', guildSchema);
