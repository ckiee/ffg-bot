import { Connection, createConnection } from "typeorm";
import { Reminder } from "./modules/reminders";
import { dbUrl } from "./env";

let db: Connection | undefined;
export async function getDB() {
	if (db) return db;
	db = await createConnection({
		type: "postgres",
		url: dbUrl,
		synchronize: true,
		logging: false,
		entities: [Reminder],
	});
	console.log("Connected to DB");
	return db;
}
