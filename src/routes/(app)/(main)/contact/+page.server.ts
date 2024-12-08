import type { PageServerLoad, Actions } from './$types';
import baseLogger from "$lib/common/winston.js";
import { fail } from "@sveltejs/kit";
import { render } from 'svelte/server';
import ContactMail from '$lib/components/email/emails/ContactMail.svelte';
import mailer from '$lib/server/email';
import { TO } from '$lib/server/email';

let logger = baseLogger.child({tags: ["contact"], origin:"/contact/page.server.ts"});
let testMode = false;

export const load = (async () => {
    return {
        title : "Contact me",
        description: "Give me your feedback, your game ideas, or your kind words !",
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {

		logger.info("Call to contact form action");
		const formData = await request.formData();

		const name = formData.get("name") as string | undefined;
		const email = formData.get("email") as string | undefined;
		const object = formData.get("object") as string | undefined;
		const message = formData.get("message") as string | undefined;
		const antispam = formData.get("antispam") as string | undefined;

		logger.info(`${name} (${email})rying to send this message : [${object}] ${message}. Antispam has value : ${antispam}`);

        if (antispam !== "") {
            logger.info("Antispam is not empty, so the sender must be a spam. Abort sending.");
            return { success: true };
        }

		try {

            logger.info("Antispam is empty, the message will be sent.");
            const { body } = render(ContactMail, { props: {
                name,
                email,
                object,
                message
            } });

            if (!testMode) {
                mailer.sendMail({
                    from: email,
                    to: TO,
                    subject: "New message from Lion-Train contact form",
                    html: body.replace(/\r\n|\r|\n/g,"<br/>")
                });
            }

            logger.info("Mail sent successfully.")
            return { success: true };

		} catch (e) {
			logger.error(`Error during contact form sending : ${e}`)
			return fail(500, {
				errors: {
					form: `An unknown error occured`
				}
			});

		}
	}
};