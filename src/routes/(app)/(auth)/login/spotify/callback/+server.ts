import { spotify } from "$lib/server/oauth";
import { OAuth2RequestError } from "arctic";
import baseLogger from "$lib/common/winston.js";
import prisma from "$lib/common/prisma.js";
import { uniqueUserTag } from "$lib/functions/tagify.js";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/auth";

interface SpotifyUser {
	id: string;
	email: string;
	display_name: string;
	images: {url: string}[];
}

let logger = baseLogger.child({tags:["spotify","callback"], origin: "/login/spotify/callback/+server.ts"});

export const GET = async (event) => {

	logger.info("In Spotify auth callback");

	const code = event.url.searchParams.get("code");
	const state = event.url.searchParams.get("state");
	const storedState = event.cookies.get("spotify_oauth_state") ?? null;
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
		const tokens = await spotify.validateAuthorizationCode(code);
		logger.info("After validation of callback");

		logger.info("Before Spotify user retrieval");
		const response = await fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const spotifyUser: SpotifyUser = await response.json();
		logger.info("Spotify user retrieved");
		
		const existingUser = await prisma.user.findUnique({
			where: {
				spotify_id: spotifyUser.id
			}
		})

		if (existingUser) {
			logger.info("User retrieved in database. Creating session cookie.")
			const token = generateSessionToken();
			const session = await createSession(token, existingUser.id);
			setSessionTokenCookie(event, token, session.expiresAt);
			logger.info("Session cookie created");

		} else {

			logger.info("User not found in database. Saving user in database.");
			let tag = await uniqueUserTag(spotifyUser.display_name);
			let newUser = await prisma.user.create({
				data: {
					spotify_id: spotifyUser.id,
					name: spotifyUser.display_name ?? null,
					tag: tag,
					email: spotifyUser.email ?? null,
					image: (spotifyUser.images.length > 0) ? spotifyUser.images[0].url : null
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