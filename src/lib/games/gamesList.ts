import type { GAME_INFOS } from "./helpers/types";
import BigBoostyInfos from "$lib/../routes/(app)/(main)/games/big-boosty/infos";
import WhatTheCutInfos from "$lib/../routes/(app)/(main)/games/what-the-cut/infos";
import PantasticInfos from "$lib/../routes/(app)/(main)/games/pantastic/infos";
import CompassionInfos from "$lib/../routes/(app)/(main)/games/compassion/infos";
import DBunkInfos from "$lib/../routes/(app)/(main)/games/dbunk/infos";

const GAMES_LIST: GAME_INFOS[] = [
    BigBoostyInfos,
    WhatTheCutInfos,
    PantasticInfos,
    CompassionInfos,
    DBunkInfos
]
export default GAMES_LIST;