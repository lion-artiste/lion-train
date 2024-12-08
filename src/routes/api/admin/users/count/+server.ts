import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';

export const GET = (async () => {
    let users = await prisma.user.count();
    return new Response(String(users));
}) satisfies RequestHandler;