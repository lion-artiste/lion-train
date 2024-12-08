import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';
import logger from '$lib/common/winston';

export const GET = (async () => {
    let playlist = await prisma.playlist.findFirst({
        where : {
            default: true
        },
        include : {
            sources: true
        },
        orderBy: {
            id: "desc"
        }
    });
    if (!playlist) {
        logger.error("No default playlist has been found (/api/public/playlists/default/+server.ts)");
        error(404, "Aucune playlist par défaut n'a été trouvée.");
    }
    return json(playlist);
}) satisfies RequestHandler;