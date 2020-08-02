import {
	command,
	default as CookiecordClient,
	Module,
	CommonInhibitors,
} from "cookiecord";
import { Message } from "discord.js";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { sheetId, googleEmail, googleKey } from "../env";

export default class SheetModule extends Module {
	doc = new GoogleSpreadsheet(sheetId);
	loadRange = "B1:E200";
	constructor(client: CookiecordClient) {
		super(client);
		this.doc.useServiceAccountAuth({
			client_email: googleEmail,
			private_key: googleKey,
		});
		this.doc.loadInfo();
	}
	@command({
		inhibitors: [
			CommonInhibitors.guildsOnly,
			CommonInhibitors.userCooldown(1000 * 30),
		],
	})
	async claim(msg: Message, row: number) {
		const sheet = this.doc.sheetsByIndex[0];
		if (row !== ~~row && row <= 1)
			return await msg.channel.send(":warning: invalid row");
		await sheet.loadCells(this.loadRange);

		const lineCell = sheet.getCell(row, 1);
		const claimedTagCell = sheet.getCell(row, 2);
		const levelCell = sheet.getCell(row, 3);
		const claimedIDCell = sheet.getCell(row, 4);

		const userLevel =
			msg.member?.roles.cache
				.map(r => levels.indexOf(r.name.toUpperCase()))
				.sort((a, b) => b - a)[0] || -10;
		const requiredLevel = levels.indexOf(
			levelCell.value.toString().toUpperCase()
		);

		if (!lineCell.value)
			return await msg.channel.send(":warning: no voiceline in that row");
		if (userLevel < requiredLevel)
			return await msg.channel.send(
				":warning: you don't have the correct level"
			);
		if (claimedIDCell.value)
			return await msg.channel.send(
				`:warning: already claimed by <@${claimedIDCell.value}>`
			);

		claimedTagCell.value = msg.author.tag;
		claimedIDCell.value = msg.author.id;

		await sheet.saveUpdatedCells();
		await msg.channel.send(
			`:ok_hand: claimed voiceline: \n> ${lineCell.value}`
		);
	}
}

const levels = ["BRIEF", "MAJOR", "RECURRING"];
