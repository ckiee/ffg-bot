import { command, default as CookiecordClient, Module } from "cookiecord";
import { Message } from "discord.js";

export default class EtcModule extends Module {
	constructor(client: CookiecordClient) {
		super(client);
	}

	@command()
	async ping(msg: Message) {
		await msg.channel.send("pong. :ping_pong:");
	}

	@command()
	async ask(msg: Message) {
		await msg.channel.send("https://dontasktoask.com/");
	}
	@command({ aliases: ["spreadsheet", "voicelines", "vls", "vl"] })
	async sheet(msg: Message) {
		await msg.channel.send(
			"Find voicelines to claim with `!claim`: https://docs.google.com/spreadsheets/d/1bS7cTsQ8vT9W7jhUgjIvTacFPy49WdOpQoihOaPj8KM/edit"
		);
	}
}
