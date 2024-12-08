import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { ColorGrid } from '$lib/components/layout/colorGrid/ColorGrid';
import prisma from '$lib/common/prisma';

export const load = (async () => {
    return {
        title : "Edit your Avatar",
        description: "Let your creativity shine ! (soon optimized for mobile)",
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
	save: async ({ request, locals }) => {

        const user = locals.user;
        if (!user) {
            return fail(500, {
				errors: {
					form: `No user found`
				}
			});
        }

		const formData = await request.formData();
		const colorgrid = formData.get("colorgrid") as string | undefined;

        if (!colorgrid) {
            return fail(500, {
				errors: {
					form: `Impossible to find input with name 'colorgrid'`
				}
			});
        }

        let colorGridArray = JSON.parse(colorgrid) as ColorGrid;
        // DO SOME VERIFICATIONS

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                pixel_avatar: JSON.stringify(colorGridArray)
            }
        });

        redirect(302, "/profile/editor");
	}
};