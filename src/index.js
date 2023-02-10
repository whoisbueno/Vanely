import chalk from "chalk";
import Vanely from "src/constants/Vanely.js";
export const client = new Vanely()

client.connect().catch(err => console.error(err))

export default client;