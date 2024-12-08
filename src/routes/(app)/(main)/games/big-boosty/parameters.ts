import type { INTEGER_PARAMETER, FLOAT_PARAMETER } from "$lib/games/helpers/types";

const nb_games: INTEGER_PARAMETER = {
    name: "Number of games",
    description: "The number of games you'd like to play in your serie",
    type: "integer",
    unit: "",
    min: 3,
    max: 200,
    default: 10
}

const min_freq: INTEGER_PARAMETER = {
    name: "Min Frequency",
    description: "The minimum frequency boostable",
    type: "integer",
    unit: "Hz",
    min: 30,
    max: 200,
    default: 60
}

const max_freq: INTEGER_PARAMETER = {
    name: "Max Frequency",
    description: "The maximum frequency boostable",
    type: "integer",
    unit: "Hz",
    min: 100,
    max: 17000,
    default: 15000
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

const gain: FLOAT_PARAMETER = {
    name: "Boost gain",
    description: "The increase of volume of the boosts",
    type: "float",
    unit: "dB",
    min: 0.5,
    max: 20,
    default: 10.0
}

const q: FLOAT_PARAMETER = {
    "name": "Q value",
    "description": "The Q value of the boosts (higher value = more focused)",
    "type": "float",
    "unit": "",
    "min": 0.3,
    "max": 20.0,
    "default": 1.5
}

const parameters = {
    nb_games,
    min_freq,
    max_freq,
    w_begin,
    w_end,
    gain,
    q
}
export default parameters;

export const BigBoostyParametersType = typeof parameters;