import type { RequestHandler } from '../$types';
import prisma from '$lib/common/prisma';
import { json } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
import { deleteFile, saveFile, slugifyFileName } from '$lib/common/fileUtils';

export const GET = (async () => {
    let sources = await prisma.source.findMany();
    return json(sources);
}) satisfies RequestHandler;

export const POST = (async ({ request, params }) => {
    const data = Object.fromEntries(await request.formData())
    console.log("Body : ", data);
    let name = data.name as string;
    let author = data.author as string;
    let link = data.link as string;
    const audio = data.audio as File;

    const source = await prisma.source.update({
        where: {
            id: parseInt(params.id)
        },
        data: {
            name,
            author,
            link,
        }
    })

    if (audio.size != 0 && audio.name != 'undefined') {

        let oldAudio = source.audio;

        const filename = `/audio/sources/${crypto.randomUUID()}-${slugifyFileName(audio.name)}`;

        try {
            await saveFile(filename, audio);
        } catch {
            return json(null);
        }

        const source2 = await prisma.source.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                audio: filename
            }
        })

        if (oldAudio) {
            try {
                let fileDeleted = await deleteFile(oldAudio);
                console.log("File deleted :", fileDeleted);
            } catch (e) {
                console.log("Error while deleting file")
            }
        }

        return json(source2);
    
    }

    console.log("New source : ", source)

    return json(source);
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
    
    let id = params.id;
    console.log("Id : ", id);

    const deletedSource = await prisma.source.delete({
        where: {
            id: parseInt(id),
        },
    })

    if (deletedSource.audio) {
        let fileDeleted = await deleteFile(deletedSource.audio);
        console.log("File deleted :", fileDeleted);
    }

    return json(deletedSource)

}) satisfies RequestHandler;