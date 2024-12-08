import type { Source } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {

    let sources: Source[] = await fetch("/api/admin/sources").then((response) => response.json());

    return {
        sources
    };
}) satisfies PageServerLoad;

export const actions = {
    delete: async ({ request, fetch }) => {
        const data = await request.formData();
        console.log(data);
        const id = data.get('id');

        const res = await fetch(`/api/admin/sources/${id}`, {
            method: "DELETE"
        })

        redirect(303, '/admin/sources');
    }
}