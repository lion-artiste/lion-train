import { writeFileSync, unlinkSync } from 'node:fs';
import path from "path";
import fs from "fs";

export const MEDIA_ROOT = "media";

if ( !fs.existsSync( MEDIA_ROOT ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( MEDIA_ROOT );
}

function getFinalPath(p: string) {
    return path.join(MEDIA_ROOT, p);
}

function getUrl(p: string) {
    return `/media${p}`
}


export const saveFile = async (filePath: string, fileData: File): Promise<string> => {

    if (!filePath || !fileData.name) throw new Error("No file or filename");

    let finalPath = getFinalPath(filePath);

    writeFileSync(finalPath, Buffer.from(await fileData.arrayBuffer()));

    return getUrl(filePath);
}

export const deleteFile = async (filePath: string): Promise<boolean> => {

    if (!filePath) throw new Error("No file path provided");

    let finalPath = getFinalPath(filePath);
    console.log("Deleting final path : ", finalPath);

    try {
        unlinkSync(finalPath);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const slugify = (str: string) => {
    return String(str)
      .normalize('NFKD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
}

export const slugifyFileName = (fileName: string | null): string | null => {
    if (!fileName) return null;
    let parts = fileName.split(".");
    if (parts.length == 0) return fileName;
    if (parts.length == 1) return slugify(fileName);
    parts[0] = slugify(parts[0]);
    return parts.join(".");
}