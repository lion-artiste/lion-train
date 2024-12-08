import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/common/prisma';

export const load = (async ({ locals, params }) => {

    let currentUser = locals.user;
    let id = params.id;
    let isTag = id && id.startsWith("@");
    if (isTag && id) id = id.slice(1);

    let isMine: boolean = (currentUser && ( !id || (isTag && id === currentUser.tag ) || (!isTag && id === currentUser.id) ) ) as boolean;

    if (!id && !currentUser) {
        error(404, "User not found");
    }

    let profileUser = isTag ? await prisma.user.findUnique({ where: { tag: id ?? (currentUser?.tag as string)}}) : await prisma.user.findUnique({ where: { id: id ?? (currentUser?.id as string)}});

    if (!profileUser) {
        error(404, "User not found");
    }

    return {
        title : "Profile",
        description: "This feature is still experimental, but soon you'll find here all your stats and records :)",
        profileUser,
        currentUser,
        isMine,
        numberGamesPlayed: await prisma.score.count({ where: { userId: profileUser.id}}),
        lastGamesPlayed: await prisma.score.findMany({
            where: {
                userId: profileUser.id
            },
            orderBy: {
                date: "desc"
            },
            take: 10
        })
    }
}) satisfies PageServerLoad;