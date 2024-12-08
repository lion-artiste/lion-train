import { COLORTABLE, type COLORS } from "./ColorGrid";

// RGB color in format [R, G, B]
export type RGB = [number, number, number]


// Distance between 2 colors (in RGB)
function distance(a: RGB, b: RGB) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
}

function hexToRgb(hex: string): RGB | null {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

function nearestColor(color: RGB, palette: RGB[]): COLORS{
    let lowest = Number.POSITIVE_INFINITY;
    let tmpDistance;
    let index = 0;
    palette.forEach( (el, i) => {
        tmpDistance = distance(color, el);
        if (tmpDistance < lowest) {
            lowest = tmpDistance;
            index = i;
        };
    })
    return index as COLORS;
}