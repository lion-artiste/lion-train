import type { User } from '@prisma/client';
import type { PageServerLoad } from './$types';
import prisma from '$lib/common/prisma';

export const load = (async ({ fetch }) => {

    //let users: (User)[] = await fetch("/api/admin/users").then((response) => response.json());
    let users = await prisma.user.findMany({
        orderBy: {
            date_signup: "desc"
        },
        include: {
            _count: {
                select: { scores: true }
            }
        }
    })

    return {
        users
    };
}) satisfies PageServerLoad;