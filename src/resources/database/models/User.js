import { Schema, model } from "mongoose";

let userSchema = new Schema({
	idU: { type: String },

	registrado: { type: Boolean, default: false },
});

export default model('Users', userSchema);