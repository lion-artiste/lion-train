import type { Signal, User } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {

    let signals: (Signal & {user: User})[] = await fetch("/api/admin/signals").then((response) => response.json());

    return {
        signals
    };
}) satisfies PageServerLoad;