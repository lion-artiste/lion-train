import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';

export const POST = (async ({ locals, request }) => {

    if (!locals.user) return json(null);

    const { sfx_volume } = await request.json();
    if (sfx_volume === null || sfx_volume === undefined) return json(null);

    let updateUser = await prisma.user.update({
        where : {
            id: locals.user.id
        },
        data: {
            sfx_volume
        }
    });

    if (!updateUser) return json(null);
    return json(sfx_volume);

}) satisfies RequestHandler;