import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load = (async () => {
    return {
        PUBLIC_BASE_URL: env.PUBLIC_BASE_URL
    };
}) satisfies PageServerLoad;