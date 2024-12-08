import prisma from '$lib/common/prisma';
import { uniqueUserTag } from '$lib/functions/tagify';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    try {

        let usersToUpdate = await prisma.user.findMany({
            where: {
                tag: null
            }
        });
    
        for (const user of usersToUpdate) {
            if (user.name) {
                let tag = await uniqueUserTag(user.name);
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        tag
                    }
                })
            }
        }

        return { success: true }

    } catch (err) {
        return { success: false, message: err }
    }

}) satisfies PageServerLoad;