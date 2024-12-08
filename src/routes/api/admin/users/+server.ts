import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';

export const GET = (async () => {
    let users = await prisma.user.findMany({
        orderBy: {
            date_signup: "desc"
        }
    });
    return json(users);
}) satisfies RequestHandler;