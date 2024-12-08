import { fail, redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { invalidateSession, deleteSessionTokenCookie } from "$lib/server/auth";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) {
		return fail(401);
	}
	await invalidateSession(event.locals.session.id);
	deleteSessionTokenCookie(event);
	redirect(302, "/login");
};

/*export const actions: Actions = {
	logout: async ({ locals, cookies }) => {
		if (!locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/login");
	}
};*/