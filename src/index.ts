import { token, botAdmins } from "./env";
import CookiecordClient, { HelpModule } from "cookiecord";
import { Intents } from "discord.js";
import SheetModule from "./modules/sheet";
import EtcModule from "./modules/etc";
import ReminderModule from "./modules/reminders";
import VpsntModule from "./modules/vpsnt";
import AutoroleModule from "./modules/autorole";
import PollModule from "./modules/poll";
import JoinRoleModule from "./modules/joinrole";
const client = new CookiecordClient(
	{
		botAdmins,
		prefix: "!",
	},
	{
		ws: { intents: Intents.NON_PRIVILEGED },
		partials: ["REACTION", "MESSAGE", "USER", "CHANNEL"],
	}
);
const prod = process.env.NODE_ENV == "production";

client.registerModule(HelpModule);

if (!prod) {
	client.loadModulesFromFolder("src/modules");
	client.reloadModulesFromFolder("src/modules");
} else {
	for (const mod of [PollModule, AutoroleModule, VpsntModule, ReminderModule, EtcModule, SheetModule, JoinRoleModule]) {
		client.registerModule(mod);
	};
}

client.login(token);
client.on("ready", () => console.log(`Logged in as ${client.user?.tag}`));
