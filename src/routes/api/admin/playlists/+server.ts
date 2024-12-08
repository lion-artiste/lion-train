import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';

export const GET = (async () => {
    let playlists = await prisma.playlist.findMany({
        include: {
            sources: true
        }
    });
    return json(playlists);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
    const data = Object.fromEntries(await request.formData())
    let name = data.name as string;
    let slug = data.slug as string;
    let description = data.description as string | null;
    let defaut = ("default" in data);
    const sources = (data.sources as string).split(";").map((id) => Number(id));
    console.log("Sources : ", sources)

    if (!name) {
        return new Response(null)
    }

    const playlist = await prisma.playlist.create({
        data: {
            name,
            slug,
            description,
            default: defaut,
            sources: {
                connect: sources.map((i) => { return {id : i}})
            }
        }
    })
    console.log("New playlist : ", playlist)

    return json(playlist);
}) satisfies RequestHandler;