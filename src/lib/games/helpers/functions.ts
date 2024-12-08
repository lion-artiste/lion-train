import type { GAME_INFOS, GAME_PARAMETERS, SCORE_STATS } from "./types";
//import prisma from "$lib/common/prisma";

export const statsNull: SCORE_STATS = {
    global: null,
    personal: null,
    total_global: null,
    total_personal: null
}

export const saveScore = async (infos: GAME_INFOS, parameters: GAME_PARAMETERS, score: number): Promise<SCORE_STATS> => {

    let parametersCondensed = Object.entries(parameters).reduce((acc, [key, value]) => {
        acc[key] = value.value ?? value.default;
        return acc;
    }, {} as {[key:string]: any});

    let score_stats: SCORE_STATS = await fetch("/api/public/users/score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            points: score,
            game: infos.id,
            parameters: parametersCondensed
        })
    }).then((response) => response.json()).catch( () => statsNull);

    return score_stats;
}

export const getUserLastParameters = async (game_id: string) => {
    let userParametersRaw = await fetch(`/api/public/games/${game_id}/parameters`).then((response) => response.json()).catch( () => null);
    if (!userParametersRaw) return null;
    let userParameters: {[key:string]: {value: string | number}} = {};
    for (const key in userParametersRaw) {
        userParameters[key] = {value: userParametersRaw[key]}
    }
    return userParameters;
}

// Convert dB to gain
export const dBToGain = (dB: number) => {
    return Math.pow(10, dB / 20);
}

  // Convert gain to dB
export const gainToDB = (gain: number) => {
    return 20 * Math.log10(gain);
}