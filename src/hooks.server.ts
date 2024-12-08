import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { validateSessionToken, setSessionTokenCookie, deleteSessionTokenCookie } from "$lib/server/auth";

const authentification: Handle = async ({ event, resolve }) => {

	const token = event.cookies.get("session") ?? null;

	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await validateSessionToken(token);

	if (session !== null) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

const authorization: Handle = async ({ event, resolve }) => {

	// Protect admin pages
	if (event.url.pathname.startsWith("/admin") || event.url.pathname.startsWith("/api/admin")) {
		if (!event.locals.user?.admin) {
			redirect(303, "/login");
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
}

export const handle: Handle = sequence(
	authentification,
	authorization
);