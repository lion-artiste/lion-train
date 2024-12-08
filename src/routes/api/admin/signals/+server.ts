import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';

export const GET = (async () => {
    let signals = await prisma.signal.findMany({
        include: {
            user: true
        },
        orderBy: [
            {
                date: "desc"
            }
        ]
    });
    return json(signals);
}) satisfies RequestHandler;