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

const min_gain: INTEGER_PARAMETER = {
    name: "Min gain",
    description: "The lowest volume reduction",
    type: "integer",
    unit: "dB",
    min: -20,
    max: 0,
    default: -15
}

const max_gain: INTEGER_PARAMETER = {
    name: "Max gain",
    description: "The highest possible volume reduction",
    type: "integer",
    unit: "dB",
    min: -20,
    max: 0,
    default: 0
}

const min_diff: INTEGER_PARAMETER = {
    name: "Min diff",
    description: "Minimum difference between the two volume reductions",
    type: "integer",
    unit: "dB",
    min: 1,
    max: 10,
    default: 1
}

const max_diff: INTEGER_PARAMETER = {
    name: "Max diff",
    description: "Minimum difference between the two volume reductions",
    type: "integer",
    unit: "dB",
    min: 1,
    max: 20,
    default: 20
}

const parameters = {
    nb_games,
    min_gain,
    max_gain,
    min_diff,
    max_diff
}
export default parameters;