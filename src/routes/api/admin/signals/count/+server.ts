import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';

export const GET = (async () => {
    let signals = await prisma.signal.count();
    return new Response(String(signals));
}) satisfies RequestHandler;