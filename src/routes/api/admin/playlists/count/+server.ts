import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';

export const GET = (async () => {
    let playlists = await prisma.playlist.count();
    return new Response(String(playlists));
}) satisfies RequestHandler;