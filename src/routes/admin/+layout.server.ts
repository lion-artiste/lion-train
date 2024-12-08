import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, route }) => {
	return {
		user: locals.user,
		route: route.id
	};
};