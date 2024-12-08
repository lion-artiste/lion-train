//import { generateRandomString, isWithinExpiration } from "lucia/utils";
/*import prisma from "./prisma";
import { render } from 'svelte-email';
import mailer, { FROM } from "./email";
import EmailToken from "./EmailVerificationToken.svelte";
import { BASE_URL } from "$lib/variables";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
    const storedUserTokens = await prisma.token.findMany({
        where: {
            user_id: userId
        }
    });
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);
    await prisma.token.create({
        data: {
            id: token,
            expires: new Date().getTime() + EXPIRES_IN,
            user_id: userId
        }
    });

	return token;
};

export const validateEmailVerificationToken = async (token: string) => {
	const storedToken = await prisma.$transaction(async (trx) => {

        const storedToken = await trx.token.findUnique({
            where: {
                id: token
            }
        });

		if (!storedToken) throw new Error("Invalid token");

        await trx.token.deleteMany({
            where: {
                user_id: storedToken.user_id
            }
        });

		return storedToken;
	});

	const tokenExpires = Number(storedToken.expires); // bigint => number conversion

	if (!isWithinExpiration(tokenExpires)) {
		throw new Error("Expired token");
	}

	return storedToken.user_id;
};

export const sendEmailVerificationLink = async (token: string) => {
    const storedToken = await prisma.token.findUnique({
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

    const tokenUrl = `${BASE_URL}/email-verification/${token}`;

    const emailHtml = render({
        template: EmailToken,
        props: {
            name: user.name ?? null,
            tokenUrl: tokenUrl
        }
    });

    return mailer.sendMail({
        from: FROM,
        to: user.email,
        subject: "Verify your email address",
        html: emailHtml
    });

};*/