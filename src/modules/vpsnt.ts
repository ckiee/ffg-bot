import {
	command,
	default as CookiecordClient,
	Module,
	listener,
} from "cookiecord";
import { Message } from "discord.js";

export default class VpsntModule extends Module {
	constructor(client: CookiecordClient) {
		super(client);
	}

	@listener({ event: "message" })
	async onMessage(msg: Message) {
		if (
			msg.author.bot ||
			msg.content.toLowerCase().includes("vps.ronthecookie.me")
		)
			return;
		await msg.delete({ reason: "vpsn't" });
		await msg.channel.send(
			`Hey ${
				msg.author
			}, the IP you posted to the server is dead, please repost:\n\`\`\`diff\n-${
				msg.content
			}\n+${msg.content
				.split("vps.ronthecookie.me")
				.join("mc.ronthecookie.me")}\`\`\``
		);
	}
}
