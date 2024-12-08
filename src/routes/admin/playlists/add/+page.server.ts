import type { Source } from '@prisma/client';
import type { PageServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/common/prisma';

export const load = (async ({ fetch }) => {

    let sources: Source[] = await fetch("/api/admin/sources").then((response) => response.json());

    return {
        sources
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();

        const name = formData.get("name") as string;
        const slug = formData.get("slug") as string;
        const description = formData.get("description") as string | null;
        const defaut = formData.has("default");
        const sources = (formData.get("sources") as string).split(";").map((id) => Number(id));
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

        redirect(303, '/admin/playlists');
    }
}