import type { Playlist, Source } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {

    let playlists: (Playlist & {sources: Source[]})[] = await fetch("/api/admin/playlists").then((response) => response.json());

    return {
        playlists
    };
}) satisfies PageServerLoad;

export const actions = {
    delete: async ({ request, fetch }) => {
        const data = await request.formData();
        console.log(data);
        const id = data.get('id');

        const res = await fetch(`/api/admin/playlists/${id}`, {
            method: "DELETE"
        })

        redirect(303, '/admin/playlists');
    }
}