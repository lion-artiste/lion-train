import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/common/prisma';

export const load = (async ({}) => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const title = formData.get("title") as string;
        const message = formData.get("message") as string | null;
    
        const news = await prisma.news.create({
            data: {
                title,
                message,
                sent: false,
            }
        })

        redirect(303, '/admin/news');
    }
}