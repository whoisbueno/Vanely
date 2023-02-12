import { model, Schema } from 'mongoose';

const commandSchema = new Schema({
	idC: {
		type: String,
	},
	commands: {
		type: Number,
		default: 0,
	},
});

export default model('Commands', commandSchema);
