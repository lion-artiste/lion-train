import prisma from "$lib/common/prisma";
import type { RequestEvent } from "@sveltejs/kit";
import type { GAME_PARAMETERS } from "./types";

export const getParameters = async (baseParameters: GAME_PARAMETERS, gameId: string, event: RequestEvent) => {

    let parameters = structuredClone(baseParameters);

    if (event.locals.user) {

            let lastPlayed = await prisma.score.findFirst({
                where: {
                    userId: event.locals.user.id,
                    game: gameId
                },
                orderBy: {
                    date: "desc"
                }
            });
        
            if (lastPlayed && lastPlayed.parameters) {
                let lastPlayedParameters = Object.fromEntries(Object.entries(lastPlayed.parameters as object).map(([k, v]) => [k, {value: v}]));
                for (const key of Object.keys(parameters)) {
                    if (key in lastPlayedParameters) {
                        parameters[key] = {...parameters[key], ...lastPlayedParameters[key]}
                    }
                }
            }
    }

    for (const key in parameters) {
        const queryValue = event.url.searchParams.get(key);
        if (queryValue !== null) {
            parameters[key as keyof typeof parameters].value = Number(queryValue);
        }
    }

    // By security, remove keys that are not in baseParams
    for (let key in parameters) {
        if (!(key in baseParameters)) {
            delete parameters[key as keyof typeof parameters]
        }
    }

    return parameters;
}