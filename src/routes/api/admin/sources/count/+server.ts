import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';

export const GET = (async () => {
    let sources = await prisma.source.count();
    return new Response(String(sources));
}) satisfies RequestHandler;