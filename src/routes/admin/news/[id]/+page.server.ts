import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/common/prisma';
import baseLogger from "$lib/common/winston.js";
import NewsMail from '$lib/components/email/emails/NewsMail.svelte';
import { render } from 'svelte/server';
import mailer, { FROM, TO } from '$lib/server/email';

let logger = baseLogger.child({tags: ["news"], origin:"/admin/news/[id]/page.server.ts"});

export const load = (async ({ params }) => {

    const id = Number(params.id);

    let news = await prisma.news.findUnique({
        where: {
            id
        }
    })
    return {
        news
    };
}) satisfies PageServerLoad;

async function saveNews(id: number, title: string | null, message: string | null) {
    const news = await prisma.news.update({
        where: {
            id
        },
        data: {
            title,
            message,
        }
    })

    return news;
}

async function sendNews(id: number, title: string | undefined, message: string | null, test = false) {

    let users = await prisma.user.findMany({
        where: {
            receive_news: true,
            email: { not: null }
        },
        select: {
            email: true
        }
    });
    //console.log("Users to send to :", users)
    //users = users.filter((user) => {user.email});

    try {

        if (!test) logger.info(`Trying to send News #${id} to users`)
        const { body } = render(NewsMail, { props: {
            title,
            message: message ?? ""
        } });

        if (!test) logger.info(`Mail for News #${id} rendered, starting the loop to send all emails`)
        let bcc = (test) ? [] : (users.map((obj) => obj.email).filter((mail) => mail !== null) as string[]);
        console.log("bcc : ", bcc)
        mailer.sendMail({
            from: FROM,
            to: TO,
            bcc,
            subject: `${test ? "[TEST] " : ""}Lion Train - ${title}`,
            html: body.replace(/\r\n|\r|\n/g,"<br/>")
        });

        if (!test) {
            await prisma.news.update({
                where: {
                    id
                },
                data: {
                    sent: true
                }
            })
            logger.info(`News #${id} sent successfully to ${users.length} recipients !`)
        }

    } catch (err) {
        logger.error(`A problem occured while sending News #${id} to users : ${err}`)
        return err;
    }

    return null;
}

export const actions = {
    save: async ({ request, params }) => {
        const formData = await request.formData();
        const id = Number(params.id);

        const title = formData.get("title") as string;
        const message = formData.get("message") as string | null;
    
        const news = await saveNews(id, title, message);

        redirect(303, '/admin/news');
    },

    send: async ({ request, params }) => {
        const formData = await request.formData();
        const id = Number(params.id);

        const title = formData.get("title") as string;
        const message = formData.get("message") as string | null;
    
        await saveNews(id, title, message);
        let error = await sendNews(id, title, message, false);

        if (error) {
            return fail(500, {
                errors: {
                    form: `An error occured : ${error}`
                }
            });
        }

        redirect(303, '/admin/news');
    },

    sendTest: async ({ request, params }) => {
        const formData = await request.formData();
        const id = Number(params.id);

        const title = formData.get("title") as string;
        const message = formData.get("message") as string | null;
    
        await saveNews(id, title, message);
        let error = await sendNews(id, title, message, true);

        if (error) {
            return fail(500, {
                errors: {
                    form: `An error occured : ${error}`
                }
            });
        }

        redirect(303, '/admin/news');
    }
}