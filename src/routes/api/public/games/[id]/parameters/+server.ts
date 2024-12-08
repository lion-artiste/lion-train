import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';

export const GET = (async ({ locals, params }) => {

    const game = params.id;

    if (!locals.user) return json(null);

    let lastScore = await prisma.score.findFirst({
        where: {
            userId: locals.user.id,
            game
        },
        orderBy: {
            date: "desc"
        }
    });

    return json(lastScore?.parameters ?? null);

}) satisfies RequestHandler;