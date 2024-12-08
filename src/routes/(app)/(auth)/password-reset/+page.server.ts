import { fail, type Actions } from "@sveltejs/kit";
import { generatePasswordResetToken, sendPasswordResetLink } from "$lib/common/resetToken";
import prisma from "$lib/common/prisma";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async () => {
	return {
        title: "Reset your password"
    };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get("email");
		// basic check
		if (
			typeof email !== "string" ||
            !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
		) {
			return fail(400, {
				message: "Invalid email"
			});
		}
		try {
            const storedUser = await prisma.user.findUnique({
                where: {
                    email: email.toLowerCase()
                }
            })
			if (!storedUser) {
				return fail(400, {
					message: "User does not exist"
				});
			}
			const token = await generatePasswordResetToken(storedUser.id);
			await sendPasswordResetLink(token);
            //toastStore.trigger({ message: "L'email de réinitialisation a bien été envoyé !" });
			return {
				success: true
			};
		} catch (e) {
			return fail(500, {
				message: "An unknown error occurred"
			});
		}
	}
};