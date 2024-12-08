import { dev } from "$app/environment";
import { spotify } from "$lib/server/oauth";
import { generateState } from "arctic";
import baseLogger from "$lib/common/winston.js";
import { redirect } from "@sveltejs/kit";

let logger = baseLogger.child({tags: ["spotify"], origin:"/login/spotify/+server.ts"});

export const GET = async ({ cookies }) => {

	logger.info("Trying to auth via Spotify");

	const state = generateState();
	const url = await spotify.createAuthorizationURL(state);
	logger.info("url and state generated for Spotify auth");

	// store state
	cookies.set("spotify_oauth_state", state, {
		path: "/",
		secure: !dev,
		httpOnly: true,
		maxAge: 60 * 60,
		sameSite: "lax"
	});
	logger.info("Cookie created, redirecting to Spotify");

	redirect(302, url.toString());
};