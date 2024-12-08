import prisma from '$lib/common/prisma';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async () => {

    let playlist = await prisma.playlist.findFirst({
        where: {
            default: true
        },
        include: {
            sources: true
        }
    });
    
    if (!playlist) {
        error(404, { message : "No playlist found" })
    }

    return {
        playlist
    }

}) satisfies LayoutServerLoad;