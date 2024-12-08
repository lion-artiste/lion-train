import { dev } from "$app/environment";
import { google } from "$lib/server/oauth";
import { generateState, generateCodeVerifier } from "arctic";
import baseLogger from "$lib/common/winston.js";
import { redirect } from "@sveltejs/kit";

let logger = baseLogger.child({tags: ["google"], origin: "/login/google/+server.ts"});

export const GET = async ({ cookies }) => {

	logger.info("Trying to auth via Google");

	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = await google.createAuthorizationURL(state, codeVerifier, {
		scopes: ["profile", "email"]
	});
	logger.info("url and state generated for Google auth");

	// store state
	cookies.set("google_auth_state", state, {
		path: "/",
		secure: !dev,
		httpOnly: true,
		maxAge: 60 * 60,
		sameSite: "lax"
	});
	logger.info("State cookie created");

	cookies.set("google_auth_code_verifier", codeVerifier, {
		path: "/",
		secure: !dev,
		httpOnly: true,
		maxAge: 60 * 60,
		sameSite: "lax"
	});
	logger.info("Code verifier cookie created");

	logger.info("Redirecting to Google")
	redirect(302, url.toString());
};