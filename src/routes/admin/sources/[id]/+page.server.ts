import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/common/prisma';

export const load = (async ({ params }) => {

    const id = params.id as string;

    const source = await prisma.source.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    return {
        source: source
    };

}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, fetch, params }) => {
        const data = await request.formData();

        const res = await fetch(`/api/admin/sources/${params.id}`, {
            method: "POST",
            body: data
        })

        redirect(303, '/admin/sources');
    }
}