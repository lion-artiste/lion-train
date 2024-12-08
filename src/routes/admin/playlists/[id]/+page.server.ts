import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/common/prisma';
import type { Source } from '@prisma/client';

export const load = (async ({ params, fetch }) => {

    const id = params.id as string;

    let sources: Source[] = await fetch("/api/admin/sources").then((response) => response.json());

    const playlist = await prisma.playlist.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            sources: true
        }
    })

    return {
        sources: sources,
        playlist: playlist
    };

}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();
        const id = Number(params.id);

        const name = formData.get("name") as string;
        const slug = formData.get("slug") as string;
        const description = formData.get("description") as string | null;
        const defaut = formData.has("default");
        const sources = (formData.get("sources") as string).split(";").map((id) => Number(id));
        console.log("Sources : ", sources)
    
        if (!name) {
            return new Response(null)
        }
    
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
                    set: sources.map((i) => { return {id : i}})
                }
            }
        })

        redirect(303, '/admin/playlists');
    }
}