import { github } from "$lib/server/oauth";
import { OAuth2RequestError } from "arctic";
import baseLogger from "$lib/common/winston.js";
import prisma from "$lib/common/prisma.js";
import { uniqueUserTag } from "$lib/functions/tagify.js";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/auth";

interface GitHubUser {
	id: number;
	login: string;
	avatar_url: string;
	name: string;
	email: string;
}

let logger = baseLogger.child({tags:["github","callback"], origin: "/login/github/callback/+server.ts"});

export const GET = async (event) => {

	logger.info("In GitHub auth callback");

	const code = event.url.searchParams.get("code");
	const state = event.url.searchParams.get("state");
	const storedState = event.cookies.get("github_oauth_state") ?? null;
	logger.info("state and code retrieved from url");

	// validate state
	if (!storedState || !state || storedState !== state) {
		logger.error("State and storedState null or not equal. Throw 400.");
		return new Response(null, {
			status: 400
		});
	}

	// validate code
	if (!code) {
		logger.error("No code. Throw 400.");
		return new Response(null, {
			status: 400
		});
	}

	try {
		logger.info("Before validation of callback");
		const tokens = await github.validateAuthorizationCode(code);
		logger.info("After validation of callback");
		logger.info("Before GitHub user retrieval");
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();
		logger.info("GitHub user retrieved");
		
		const existingUser = await prisma.user.findUnique({
			where: {
				github_id: githubUser.id
			}
		})

		if (existingUser) {
			logger.info("User retrieved in database. Creating session cookie.")
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, existingUser.id);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);
			logger.info("Session cookie created")

		} else {

			logger.info("User not found in database. Retrieving email.")
			const response = await fetch("https://api.github.com/user/emails", {
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`
				}
			});
			const emails: {email: string}[] = await response.json();
			let email = (emails && emails.length && emails.length > 0) ? emails[0].email : null;

			logger.info("Email retrieved. Saving user in database.")

			let name = githubUser.name ?? githubUser.login;
			let tag = await uniqueUserTag(name);
			let newUser = await prisma.user.create({
				data: {
					github_id: githubUser.id,
					name: name,
					tag: tag,
					email: githubUser.email ?? email ?? null,
					image: (githubUser.avatar_url) ?? null
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