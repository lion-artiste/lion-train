import nodemailer from 'nodemailer';
import { env } from "$env/dynamic/private";

const mailer = nodemailer.createTransport({
	host: 'lion-train.fr',
	port: 465,
	secure: true,
	auth: {
		user: 'news@lion-train.fr',
		pass: env.EMAIL_PASSWORD
	}
});
export default mailer;

export const FROM = "Lion Train <news@lion-train.fr>";
export const TO = "Lion Train <contact@lion-artiste.fr>";