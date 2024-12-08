import type { PageServerLoad } from './$types';

export const load = (async ({parent}) => {

    let { parameters } = await parent();

    return {
        description: "Customize the parameters of your next game",
        parameters
    }
}) satisfies PageServerLoad;