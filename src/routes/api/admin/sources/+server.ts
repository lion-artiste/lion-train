import type { RequestHandler } from './$types';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';
import { saveFile, slugifyFileName } from '$lib/common/fileUtils';

import baseLogger from "$lib/common/winston.js";
let logger = baseLogger.child({tags:["source","api"], origin: "/api/admin/sources/+server.ts"});

export const GET = (async () => {
    let sources = await prisma.source.findMany();
    return json(sources);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
    logger.info("Adding new source");
    
    const data = Object.fromEntries(await request.formData());
    logger.info("Data created in API");
    let name = data.name as string | null;
    let author = data.author as string | null;
    let link = data.link as string | null;
    const audio = data.audio as File;
    //console.log("Body : ", data);
    logger.info(`Data received : Name = ${name}; Author = ${author}; Link = ${link}; Audio = ${audio}`);

    if (!name || !author || !link || audio.size == 0 || audio.name == 'undefined') {
        logger.error("Data missing, abort");
        return new Response(null)
    }

    logger.info("Creating file name");
    const filename = `/audio/sources/${crypto.randomUUID()}-${slugifyFileName(audio.name)}`;
    logger.info(`File name : ${filename}`);

    let url: string | undefined = undefined;
    try {
        url = await saveFile(filename, audio);
    } catch (e) {
        logger.error(`Error while calling function saveFile : ${e}`);
        return new Response(null)
    }

    if (!url) return new Response(null)

    const source = await prisma.source.create({
        data: {
            name,
            author,
            link,
            audio: url
        }
    })
    logger.info(`New source successfully created`);
    //console.log("New source : ", source)

    return json(source);
}) satisfies RequestHandler;