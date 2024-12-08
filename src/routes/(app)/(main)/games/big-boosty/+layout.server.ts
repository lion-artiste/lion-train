import { getParameters } from "$lib/games/helpers/parameters";
import type { LayoutServerLoad } from "./$types";
import infos from "./infos";
import baseParameters from "./parameters";

export const load = (async (event) => {

    let parameters = await getParameters(baseParameters, infos.id, event) as typeof baseParameters;
    console.log(parameters)

    return {
        title : infos.name,
        description: infos.description,
        background: infos.main_color,
        infos,
        parameters
    }

}) satisfies LayoutServerLoad;