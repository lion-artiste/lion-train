import { Argon2id } from "oslo/password";
import { fail, redirect } from "@sveltejs/kit";
import prisma from '$lib/common/prisma';
import type { PageServerLoad, Actions } from "./$types";
import { uniqueUserTag } from "$lib/functions/tagify";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		if (!locals.user?.email_verified) redirect(302, "/email-verification");
		redirect(302, "/");
	}
	return {
		title: "Sign up"
	};
};

export const actions: Actions = {
	default: async (event) => {

		console.log("Dans signup");

		const formData = await event.request.formData();

		const name = formData.get("name");
		const email = formData.get("email");
		const password = formData.get("password");

		// basic check
		if (
			typeof email !== "string" ||
            !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
		) {
			return fail(400, {
				errors: {
					email: "Invalid email"
				}
			});
		}
		if (
			typeof name !== "string" ||
			name.length < 4 ||
			name.length > 50
		) {
			return fail(400, {
				errors: {
					name: "Invalid name"
				}
			});
		}
		if (
			typeof password !== "string" ||
			password.length < 6 ||
			password.length > 255
		) {
			return fail(400, {
				errors: {
					password: "Invalid password"
				}
			});
		}

		try {

			// Check if user with this email address already exists
			let existingUser = await prisma.user.findUnique({
				where: {
					email: email
				}
			});

			if (existingUser) {
				{
					return fail(400, {
						errors: {
							email: "Invalid email"
						}
					});
				}
			}

			// Generate unique tag
			let tag = await uniqueUserTag(name);
			
			// Create user
			const hashedPassword = await new Argon2id().hash(password);
			let newUser = await prisma.user.create({
				data: {
					name,
					email,
					tag,
					hashed_password: hashedPassword
				}
			})

			if (!newUser) {
				return fail(400, {
					errors: {
						form: "Error while creating user in database"
					}
				});
			}

			const token = generateSessionToken();
			const session = await createSession(token, newUser.id);
			setSessionTokenCookie(event, token, session.expiresAt);

			//const token = await generateEmailVerificationToken(newUser.id);
			//await sendEmailVerificationLink(token);

		} catch (e) {
			return fail(500, {
				errors: {
					form: `An unknown error occured ${e}`
				}
			});
		}

		redirect(302, "/");
	}
};