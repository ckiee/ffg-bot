import {
	command,
	default as CookiecordClient,
	Module,
	CommonInhibitors,
	listener,
} from "cookiecord";
import { Message } from "discord.js";
import { inspect } from "util";

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
	@command({ single: true, inhibitors: [CommonInhibitors.botAdminsOnly] })
	async eval(msg: Message, js: string) {
		if (msg.author.id !== "142244934139904000") throw new Error("not ron");
		console.log("EVAL", js);
		try {
			let result = eval(js);
			if (result instanceof Promise) result = await result;
			if (typeof result !== `string`) result = inspect(result);
			if (result.length > 1990)
				return await msg.channel.send(
					`Message is over the discord message limit.`
				);
			await msg.channel.send(
				"```js\n" +
					result.split(this.client.token).join("[TOKEN]") +
					"\n```"
			);
		} catch (error) {
			msg.reply(
				"error! " +
					(error || "")
						.toString()
						.split(this.client.token)
						.join("[TOKEN]")
			);
		}
	}
	hopChans: string[] = [];
	@command({ inhibitors: [CommonInhibitors.botAdminsOnly] })
	async addhopmutechans(msg: Message, ids: string) {
		this.hopChans = this.hopChans.concat(ids.split(","));
		msg.channel.send(
			`:ok_hand: now \`hopChans.length\` = \`${this.hopChans.length}\``
		);
	}
	@listener({ event: "message" })
	async hippityhoppity(msg: Message) {
		if (!this.client.botAdmins.includes(msg.author.id)) return;
		if (
			!msg.content.startsWith(
				"Hippity hoppity this channel is now my property"
			)
		)
			return;
		for (let id of this.hopChans) {
			const member = await msg.guild?.members.fetch(id);
			const mutedRole = msg.guild?.roles.cache.find(
				r => r.name == "Muted"
			);
			if (mutedRole) await member?.roles.add(mutedRole);
			msg.channel.send(`:ok_hand: Muted ${member?.user}.`);
		}
	}
}
