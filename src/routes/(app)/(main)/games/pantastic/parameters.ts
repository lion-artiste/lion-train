import type { INTEGER_PARAMETER } from "$lib/games/helpers/types";

const nb_games: INTEGER_PARAMETER = {
    name: "Number of games",
    description: "The number of games you'd like to play in your serie",
    type: "integer",
    unit: "",
    min: 3,
    max: 200,
    default: 10
}

const min_pan: INTEGER_PARAMETER = {
    name: "Min Pan",
    description: "The minimum pan value (-100 = left, 100 = right)",
    type: "integer",
    unit: "%",
    min: -95,
    max: 0,
    default: -95
}

const max_pan: INTEGER_PARAMETER = {
    name: "Max Pan",
    description: "The maximum pan value (-100 = left, 100 = right)",
    type: "integer",
    unit: "%",
    min: 0,
    max: 95,
    default: 95
}

const w_begin: INTEGER_PARAMETER = {
    name: "Start window width",
    description: "The width of the guessing window at the beginning of the serie, in percent of the total width",
    type: "integer",
    unit: "%",
    min: 10,
    max: 90,
    default: 60
}

const w_end: INTEGER_PARAMETER = {
    name: "End window width",
    description: "The width of the guessing window at the end of the serie, in percent of the total width",
    type: "integer",
    unit: "%",
    min: 10,
    max: 90,
    default: 20
}

const parameters = {
    nb_games,
    min_pan,
    max_pan,
    w_begin,
    w_end
}
export default parameters;