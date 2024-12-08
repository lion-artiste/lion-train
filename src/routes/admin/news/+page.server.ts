import type { News } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/common/prisma';

export const load = (async () => {

    let news: (News)[] = await prisma.news.findMany();

    return {
        news
    };
}) satisfies PageServerLoad;

export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = Number(data.get('id') as string);

        let news = await prisma.news.delete({
            where: {
                id
            }
        })

        redirect(303, '/admin/news');
    }
}