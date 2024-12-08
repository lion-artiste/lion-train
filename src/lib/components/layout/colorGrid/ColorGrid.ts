export type COLORS = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export type ColorGrid = COLORS[][];
export const COLORGRIDSIZE = 35;

export let COLORTABLE = [
    "#161423", // black
    "#6a5fa0", // purple
    "#f2f2f9", // white
    "#e76d14", // orange
    "#edb329", // gold
    "#f7e26c", // yellow
    "#6c251e", // marron
    "#934226", // brown
    "#1867a0", // blue
    "#26dddd", // sky
    "#126d30", // olive
    "#1fcb23", // green
    "#98183c", // magenta
    "#d82323", // red
    "#e98472", // pink
    "#f2c0a2", // skin
];
// From https://lospec.com/palette-list/basic-16

export let DEFAULTGRIDS: {name: string, grid: () => ColorGrid}[] = [
    {
        name: "White",
        grid: () => Array.from({length: COLORGRIDSIZE}, () => Array.from({length: COLORGRIDSIZE}, () => 2)) as ColorGrid
    },
    {
        name: "Black",
        grid: () => Array.from({length: COLORGRIDSIZE}, () => Array.from({length: COLORGRIDSIZE}, () => 0)) as ColorGrid
    },
    {
        name: "Random",
        grid: () => Array.from({length: COLORGRIDSIZE}, () => Array.from({length: COLORGRIDSIZE}, () => Math.round(Math.random() * 15))) as ColorGrid
    }
]

export type TOOL = "pen" | "pot";