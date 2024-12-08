import path from 'node:path'
import fs from 'node:fs/promises'
import { error } from '@sveltejs/kit'
import { MEDIA_ROOT } from '$lib/common/fileUtils.js'
import { read } from '$app/server'

export const GET = async ({ params }) => {
    const pathName = path.resolve(MEDIA_ROOT , params.path)

    // if (isFileForbiden(pathName)) throw error(403) // use 403 (forbiden) here

    try {
        const file = await fs.readFile(pathName)
        return new Response(file)
    } catch {
        throw error(404, "File not found") // use 404 (not found) here
    }
}