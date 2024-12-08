import { fail, redirect, type Actions } from "@sveltejs/kit";
import { validatePasswordResetToken } from "$lib/common/resetToken";
import prisma from "$lib/common/prisma";
import { Argon2id } from "oslo/password";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/auth";

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const password = formData.get("password");
		// basic check
		if (
			typeof password !== "string" ||
			password.length < 6 ||
			password.length > 255
		) {
			return fail(400, {
				message: "Invalid password"
			});
		}
		try {
			const { token } = event.params;
            if (!token) return fail(400, {message: "No token found."});
			const userId = await validatePasswordResetToken(token);
			let user = await prisma.user.findUnique({
				where: {
					id: userId
				}
			});
			if (!user) return fail(400, {message: "No user found."});
			await prisma.session.deleteMany({
				where: {
					userId: user.id
				}
			})
            if (!user.email) return fail(400, {message: "User has no email address."});
			const hashedPassword = await new Argon2id().hash(password);
			await prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					hashed_password: hashedPassword
				}
			})
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, user.id);
			setSessionTokenCookie(event, token, session.expiresAt);

		} catch (e) {
			return fail(400, {
				message: "Invalid or expired password reset link"
			});
		}
		redirect(302, "/");
	}
};