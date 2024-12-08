import { dev } from "$app/environment";
import { github } from "$lib/server/oauth";
import { generateState } from "arctic";
import baseLogger from "$lib/common/winston.js";
import { redirect } from "@sveltejs/kit";

let logger = baseLogger.child({tags: ["github"], origin:"/login/github/+server.ts"});

export const GET = async ({ cookies }) => {

	logger.info("Trying to auth via GitHub");

	const state = generateState();
	const url = await github.createAuthorizationURL(state, {
		scopes: ["email"]
	});
	logger.info("url and state generated for GitHub auth");

	// store state
	cookies.set("github_oauth_state", state, {
		path: "/",
		secure: !dev,
		httpOnly: true,
		maxAge: 60 * 60,
		sameSite: "lax"
	});
	logger.info("Cookie created, redirecting to GitHub");

	redirect(302, url.toString());
};