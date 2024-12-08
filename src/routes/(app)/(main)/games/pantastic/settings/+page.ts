import type { PageLoad } from './$types';

export const load = (async () => {

    return {
        description: "Customize the parameters of your next game",
    }
}) satisfies PageLoad;