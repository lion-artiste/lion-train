import { google } from "$lib/server/oauth";
import { OAuth2RequestError } from "arctic";
import baseLogger from "$lib/common/winston.js";
import prisma from "$lib/common/prisma.js";
import { uniqueUserTag } from "$lib/functions/tagify.js";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/auth";

interface GoogleUser {
	sub: string;
	name: string;
	picture: string;
	email: string | null;
}

let logger = baseLogger.child({tags:["google","callback"], origin: "/login/google/callback/+server.ts"});

export const GET = async (event) => {

	logger.info("In Google auth callback");

	const code = event.url.searchParams.get("code");
	const state = event.url.searchParams.get("state");
	const storedState = event.cookies.get("google_auth_state") ?? null;
	const storedCodeVerifier = event.cookies.get("google_auth_code_verifier") ?? null;
	logger.info("state and code retrieved from url");

	// validate state
	if (!storedState || !state || storedState !== state) {
		logger.error("State and storedState null or not equal. Throw 400.");
		return new Response(null, {
			status: 400
		});
	}

	// validate code
	if (!code || !storedCodeVerifier) {
		logger.error("No code. Throw 400.");
		return new Response(null, {
			status: 400
		});
	}

	try {
		logger.info("Before validation of callback");
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
		logger.info("After validation of callback");

		logger.info("Before Google user retrieval");
		const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser: GoogleUser = await response.json();
		logger.info("Google user retrieved");
		
		// Find user
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [
					{
						google_id: googleUser.sub
					},
					{
						AND: [
							{
								email: { not: null }
							},
							{
								email: googleUser.email
							}
						]
					}
				]
			}
		})

		if (existingUser) {

			// Update user if necessary
			if (!existingUser.google_id || (googleUser.email && !existingUser.email) || (googleUser.picture && !existingUser.image)) {
				await prisma.user.update({
					where: {
						id: existingUser.id
					},
					data: {
						google_id: googleUser.sub,
						email: existingUser.email ?? googleUser.email,
						image: existingUser.image ?? googleUser.picture,
						name: existingUser.name ?? googleUser.name
					}
				})
			}

			// Create session
			logger.info("User retrieved in database. Creating session cookie.")
			const token = generateSessionToken();
			const session = await createSession(token, existingUser.id);
			setSessionTokenCookie(event, token, session.expiresAt);
			logger.info("Session cookie created")

		} else {

			logger.info("User not found in database. Saving user in database.")

			let tag = await uniqueUserTag(googleUser.name);
			let newUser = await prisma.user.create({
				data: {
					google_id: googleUser.sub,
					name: googleUser.name,
					tag: tag,
					email: googleUser.email,
					image: googleUser.picture
				}
			});
			logger.info("New user created in database. Creating session cookie.")

			const token = generateSessionToken();
			const session = await createSession(token, newUser.id);
			setSessionTokenCookie(event, token, session.expiresAt);
			logger.info("Session cookie created")
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
		
	} catch (e) {
		logger.error("Error catched during try block");
		if (e instanceof OAuth2RequestError) {
			logger.error(`OAuth2RequestError: ${e.message}. Error 400.`);
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		logger.error(e);
		return new Response(null, {
			status: 500
		});
	}
};