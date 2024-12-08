import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';

export const POST = (async ({ locals, request }) => {

    let userId = locals.user?.id ?? null;

    const { code, value } = await request.json() as {code: string, value: string | null};

    try {

        let newSignal = await prisma.signal.create({
            data: {
                code,
                value,
                userId
            }
        });

        if (!newSignal) return json(null);
        return json(newSignal);

    } catch (e) {
        return json(null);
    }

}) satisfies RequestHandler;