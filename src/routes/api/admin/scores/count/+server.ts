import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';

export const GET = (async () => {
    let scores = await prisma.score.count();
    return new Response(String(scores));
}) satisfies RequestHandler;