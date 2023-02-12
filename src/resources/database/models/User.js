import { model, Schema } from 'mongoose';

const userSchema = new Schema({
	idU: { type: String },

	registrado: { type: Boolean, default: false },
});

export default model('Users', userSchema);
