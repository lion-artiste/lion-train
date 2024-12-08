import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';

export const GET = (async () => {
    let scores = await prisma.score.findMany({
        include: {
            user: true
        },
        orderBy: [
            {
                date: "desc"
            }
        ]
    });
    return json(scores);
}) satisfies RequestHandler;