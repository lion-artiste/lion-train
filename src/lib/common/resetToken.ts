import prisma from "./prisma";
import { render } from 'svelte/server';
import mailer, { FROM } from "$lib/server/email";
import EmailToken from "$lib/components/email/emails/EmailResetPassword.svelte";
import { env } from "$env/dynamic/public";
import { isWithinExpirationDate } from "oslo";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

function generateToken(size: number = 20) {
    return [...Array(size)].map(() => Math.random().toString(36)[2]).join('');
}

export const generatePasswordResetToken = async (userId: string) => {
    await prisma.resetToken.deleteMany({
        where: {
            user_id: userId
        }
    });
	const token = generateToken();
    await prisma.resetToken.create({
        data: {
            id: token,
            expires: new Date().getTime() + EXPIRES_IN,
            user_id: userId
        }
    });

	return token;
};

export const validatePasswordResetToken = async (token: string) => {
	const storedToken = await prisma.$transaction(async (trx) => {

        const storedToken = await trx.resetToken.findUnique({
            where: {
                id: token
            }
        });

		if (!storedToken) throw new Error("Invalid token");

        await trx.resetToken.deleteMany({
            where: {
                id: storedToken.id
            }
        });

		return storedToken;
	});

	const tokenExpires = Number(storedToken.expires); // bigint => number conversion

	if (!isWithinExpirationDate(new Date(tokenExpires))) {
		throw new Error("Expired token");
	}

	return storedToken.user_id;
};

export const sendPasswordResetLink = async (token: string) => {
    const storedToken = await prisma.resetToken.findUnique({
        where: {
            id: token
        }
    });
    if (!storedToken) throw new Error("Invalid token");

    const user = await prisma.user.findUnique({
        where: {
            id: storedToken.user_id
        }
    })
    if (!user) throw new Error("No user found");
    if (!user.email) throw new Error("User has no email address");

    const tokenUrl = `${env.PUBLIC_BASE_URL}/password-reset/${token}`;

    const { body } = render(EmailToken, {
            props: {
                name: user.name ?? null,
                tokenUrl: tokenUrl
            }
        }
    );

    return mailer.sendMail({
        from: FROM,
        to: user.email,
        subject: "Reset your password",
        html: body
    });

};