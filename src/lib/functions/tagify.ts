import prisma from "$lib/common/prisma";
import slugify from "@sindresorhus/slugify";

export function tagify(str: string) {
    return slugify(str, {separator: ''});
}

function numero(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 {
    return Math.round(Math.random() * 9) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

function numeros(length: number): string {
    return Array.from({length}, () => numero()).join("");
}

export async function uniqueUserTag(str: string) {

    let tag = tagify(str);

    let userWithSameTag = await prisma.user.findUnique({
        where: {
            tag
        }
    });

    if (!userWithSameTag) return tag;

    // Find similar tags, and make tag unique
    let similarTags = (await prisma.user.findMany({
        where: {
            tag: {
                startsWith: tag,
            }
        },
        select: {
            tag: true
        }
    })).map((el) => el.tag).filter(n => n) as string[];

    let tentatives = 0;
    let tentativesMax = 10;
    let found = false;
    while (!found && tentatives < tentativesMax) {
        tentatives++;
        let proposition = `${tag}${numeros(3)}`;
        if (!similarTags.includes(proposition)) {
            found = true;
            tag = proposition;
        }
    }

    if (found) return tag;

    let endLengthes = similarTags.map((el) => el.length - tag.length);
    let endLength = Math.max(...endLengthes) + 1;
    return `${tag}${numeros(endLength)}`
}