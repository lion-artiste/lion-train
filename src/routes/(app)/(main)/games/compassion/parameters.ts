import type { INTEGER_PARAMETER, FLOAT_PARAMETER, CHOICE_PARAMETER } from "$lib/games/helpers/types";

const nb_games: INTEGER_PARAMETER = {
    name: "Number of games",
    description: "The number of games you'd like to play in your serie",
    type: "integer",
    unit: "",
    min: 3,
    max: 200,
    default: 10
}

const game_mode: CHOICE_PARAMETER<"attack" | "release" | "ratio" | "knee" | "threshold"> = {
    name: "Game mode",
    description: "The value that should be discriminated",
    type: "choice",
    unit: "",
    choices: [
        {value: "threshold", display: "Threshold"},
        {value: "attack", display: "Attack"},
        {value: "release", display: "Release"},
        {value: "ratio", display: "Ratio"},
        {value: "knee", display: "Knee"},
    ],
    default: "threshold"
}

const min_value: INTEGER_PARAMETER = {
    name: "Min value",
    description: "Minimum value of the current target",
    type: "integer",
    unit: "db",
    min: -40,
    max: 0,
    default: -40
}

const max_value: INTEGER_PARAMETER = {
    name: "Max value",
    description: "Maximum value of the current target",
    type: "integer",
    unit: "db",
    min: -40,
    max: 0,
    default: 0
}

const min_diff: INTEGER_PARAMETER = {
    name: "Min difference",
    description: "Minimum difference between values to find",
    type: "integer",
    unit: "db",
    min: 1,
    max: 39,
    default: 10
}

const max_diff: INTEGER_PARAMETER = {
    name: "Max difference",
    description: "Maximum difference between values to find",
    type: "integer",
    unit: "db",
    min: 1,
    max: 39,
    default: 39
}

const attack: INTEGER_PARAMETER = {
    name: "Attack",
    description: "The attack time of the compressor",
    type: "integer",
    unit: "ms",
    min: 0,
    max: 1000,
    default: 10
}

const release: INTEGER_PARAMETER = {
    name: "Release",
    description: "The release time of the compressor",
    type: "integer",
    unit: "ms",
    min: 0,
    max: 1000,
    default: 100
}

const ratio: FLOAT_PARAMETER = {
    name: "Ratio",
    description: "The ratio of the compressor",
    type: "float",
    unit: "",
    min: 1.0,
    max: 20.0,
    default: 4.0
}

const knee: FLOAT_PARAMETER = {
    name: "Knee",
    description: "The knee of the compressor (0dB = hard knee)",
    type: "float",
    unit: "dB",
    min: 0.0,
    max: 40.0,
    default: 0.0
}

const threshold: INTEGER_PARAMETER = {
    name: "Threshold",
    description: "The threshold of the compressor",
    type: "integer",
    unit: "dB",
    min: -40,
    max: 0,
    default: -10
}

const parameters = {
    nb_games,
    game_mode,
    min_value,
    max_value,
    min_diff,
    max_diff,
    attack,
    release,
    ratio,
    knee,
    threshold
}
export default parameters;