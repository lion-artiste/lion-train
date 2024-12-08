import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import baseLogger from "$lib/common/winston.js";
let logger = baseLogger.child({tags:["source","add"], origin: "/admin/sources/add/+page.server.ts"});

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, fetch }) => {
        logger.info("Inside ACTION for posting new source");
        
        let data: FormData | undefined = undefined;
        try {
            data = await request.formData();
        } catch (e) {
            logger.error(`Error while retrieving data : ${e}`);
        }
        logger.info("Data retrieved");

        logger.info("Before call to server");
        try {
            const res = await fetch("/api/admin/sources", {
                method: "POST",
                body: data
            })
        } catch (e) {
            logger.error(`Error while calling API : ${e}`, );
            throw new Error(`Error while calling API : ${e}`);
        }

        redirect(303, '/admin/sources');
    }
}