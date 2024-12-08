import { Argon2id } from "oslo/password";
import { fail, redirect } from "@sveltejs/kit";
import baseLogger from "$lib/common/winston.js";

let logger = baseLogger.child({tags: ["login"], origin:"/login/page.server.ts"});

import type { PageServerLoad, Actions } from "./$types";
import prisma from "$lib/common/prisma";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		if (!locals.user?.email_verified) redirect(302, "/email-verification");
		redirect(302, "/");
	}
	return {
		title: "Sign in"
	};
};

export const actions: Actions = {
	default: async (event) => {

		logger.info("Call to login action");
		const formData = await event.request.formData();

		const email = formData.get("email");
		const password = formData.get("password");
		logger.info(`Trying to login this email : ${email}`);

		// basic check
		if (
			typeof email !== "string" ||
			!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
		) {
			logger.error("Error while base-checking email")
			return fail(400, {
				errors: {
					email: "Invalid email"
				}
			});
		}
		if (
			typeof password !== "string" ||
			password.length < 1 ||
			password.length > 255
		) {
			logger.error("Error while base-checking password")
			return fail(400, {
				errors: {
					password: "Invalid password"
				}
			});
		}
		logger.info("Base check passed")

		try {

			const user = await prisma.user.findUnique({
				where: {
					email: email
				}
			})

			if (!user || !user.hashed_password) {
				logger.error("No corresponding user found in database");
				return fail(400, {
					errors: {
						form: "Invalid email or password"
					}
				});
			}
			logger.info("Corresponding user retrieved")

			const validPassword = await new Argon2id().verify(user.hashed_password, password);
			if (!validPassword) {
				logger.error("Failed password validation");
				return fail(400, {
					errors: {
						form: "Invalid email or password"
					}
				});
			}
			logger.info("Password valid")

			const token = generateSessionToken();
			const session = await createSession(token, user.id);
			setSessionTokenCookie(event, token, session.expiresAt);
			logger.info("Session created");

		} catch (e) {
			logger.error(`Error during login : ${e}`)
			return fail(500, {
				errors: {
					form: `An unknown error occured`
				}
			});

		}

		redirect(302, "/");
	}
};