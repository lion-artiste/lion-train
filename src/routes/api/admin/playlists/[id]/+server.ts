import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';

export const GET = (async () => {
    let playlists = await prisma.playlist.findMany();
    return json(playlists);
}) satisfies RequestHandler;

export const POST = (async ({ request, params }) => {
    let id= parseInt(params.id);

    const data = Object.fromEntries(await request.formData())
    console.log("Body : ", data);
    let name = data.name as string;
    let slug = data.slug as string;
    let description = data.description as string | null;
    let defaut = ("default" in data);
    const sources = JSON.parse(data.sources as string).map( (source: any) => { return { id:source.value } } );
    console.log("Sources : ", sources)

    const playlist = await prisma.playlist.update({
        where: {
            id
        },
        data: {
            name,
            slug,
            description,
            default: defaut,
            sources: {
                set: sources
            }
        }
    })
    console.log("New playlist : ", playlist)

    return json(playlist);
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
    
    let id = params.id;
    console.log("Id : ", id);

    const deleted = await prisma.playlist.delete({
        where: {
            id: parseInt(id),
        },
    })

    return json(deleted)

}) satisfies RequestHandler;