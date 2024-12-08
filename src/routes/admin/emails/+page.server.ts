import mailer from '$lib/server/email';
import type { PageServerLoad } from './$types';
import { createEmail, emailList, sendEmail, SendEmailFunction } from 'svelte-email-tailwind/preview';

export const load = (async () => {
    // return the list of email components
	return emailList({ path: '/src/lib/components/email/emails' });
}) satisfies PageServerLoad;

const sendUsingNodemailer: typeof SendEmailFunction = async ({ from, to, subject, html }) => {

	const info = await mailer.sendMail({ from, to, subject, html });

    console.log("Info : ", info);

    return { success: true }

	/*if (sent) {
		return { success: false, error: sent.error };
	} else {
		return { success: true };
	}*/
};

export const actions = {
	// Pass in the two actions. Provide your Resend API key.
	...createEmail,
	...sendEmail({ customSendEmailFunction: sendUsingNodemailer })
};