import { default as CookiecordClient, listener, Module } from "cookiecord";
import { GuildMember } from "discord.js";
import { joinRoleID } from "../env";

export default class JoinRoleModule extends Module {
	constructor(client: CookiecordClient) {
		super(client);
	}

	@listener({event: "guildMemberAdd"})
	onJoin(member: GuildMember) {
		member.roles.add(joinRoleID);
	}
}
