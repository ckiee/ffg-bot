import dotenv from "dotenv-safe";
dotenv.config();

export const token = process.env.TOKEN!;
export const botAdmins = process.env.BOT_ADMINS!.split(",");
export const autorole = process.env.AUTOROLE!.split(",").map(x => {
	const [msgID, roleID, emoji, autoRemove] = x.split(":");
	return {
		msgID,
		roleID,
		emoji,
		autoRemove: autoRemove == "true",
	};
});
export const joinRoleID = process.env.JOIN_ROLE_ID!;

export const dbUrl = process.env.DB_URL!;
export const sheetId = process.env.SHEET_ID!;
export const googleEmail = process.env.GOOGLE_EMAIL!;
export const googleKey = process.env.GOOGLE_KEY!;

export const BLUE = "#007ACC";
