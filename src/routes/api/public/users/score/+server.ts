import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';

export const POST = (async ({ locals, request }) => {

    if (!locals.user) return json(null);
    let userId = locals.user.id;

    const { points, game, parameters } = await request.json();

    let [rankUser, totalUser, rankWorld, totalWorld] = await Promise.all([
        prisma.score.count({ // rank user
            where: {
                userId,
                game,
                points: {
                    gte: points
                }
            }
        }),
        prisma.score.count({ // total user
            where: {
                userId,
                game
            },
        }),
        prisma.score.count({ // rank world
            where: {
                game,
                points: {
                    gte: points
                }
            }
        }),
        prisma.score.count({ // total world
            where: {
                game
            }
        })
    ]);

    let newScore = await prisma.score.create({
        data: {
            points,
            game,
            parameters,
            userId,
            personal_rank: rankUser + 1,
            world_rank: rankWorld + 1,
            personal_total: totalUser + 1,
            world_total: totalWorld + 1,
        }
    });

    if (!newScore) return json(null);

    return json({
        global: rankWorld + 1,
        personal: rankUser + 1,
        total_global: totalWorld + 1,
        total_personal: totalUser + 1
    });

}) satisfies RequestHandler;