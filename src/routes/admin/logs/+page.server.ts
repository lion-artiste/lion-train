import type { PageServerLoad} from "./$types";

import { promises as fs } from "fs";
import { jsonLogDir } from "$lib/common/winston";
import type { Log } from "$lib/common/winston";

export const load: PageServerLoad = async ({ locals }) => {

    let logs: Log[] = [];

    try {
        const buffer = await fs.readFile(jsonLogDir);
        const data = buffer.toString('utf8');
        logs = data.split('\n').filter(line => line.trim()).map(line => JSON.parse(line)).reverse();
    } catch (err) {
        throw err;
    }

    //console.log("Logs : ", logs)

	return {
        logs
	};
};