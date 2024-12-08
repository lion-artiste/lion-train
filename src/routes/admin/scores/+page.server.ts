import type { Score, User } from '@prisma/client';
import type { PageServerLoad } from './$types';
import prisma from '$lib/common/prisma';

export const load = (async ({ fetch }) => {

    //let scores: (Score & {user: User})[] = await fetch("/api/admin/scores").then((response) => response.json());

    let scores = await prisma.score.findMany({
        orderBy: {
            date: "desc"
        },
        include: {
            user: true
        }
    })

    return {
        scores
    };
}) satisfies PageServerLoad;