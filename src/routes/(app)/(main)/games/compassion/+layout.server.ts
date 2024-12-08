import type { LayoutServerLoad } from "./$types";
import infos from "./infos";
import baseParameters from "./parameters";
import { getParameters } from "$lib/games/helpers/parameters";

export const load = (async (event) => {
    
    let parameters = await getParameters(baseParameters, infos.id, event) as typeof baseParameters;

    let description = infos.description;
    switch (parameters.game_mode.value ?? parameters.game_mode.default) {
        case "attack":
            description = "Find which signal has the quickest attack !"
            break;
        case "release":
            description = "Find which signal has the quickest release !"
            break;
        case "ratio":
            description = "Find which signal has the highest ratio !"
            break;
        case "knee":
            description = "Find which signal has the highest knee !"
            break;
        case "threshold":
            description = "Find which signal has the lowest threshold !"
            break;
        default:
            break;
    }

    return {
        title : infos.name,
        description: description + " (experimental)",
        background: infos.main_color,
        infos,
        parameters
    }
}) satisfies LayoutServerLoad;