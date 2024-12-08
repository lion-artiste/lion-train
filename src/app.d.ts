import { User, Session } from "@prisma/client";
import type { UserWithoutPassword } from "$lib/server/auth";

declare global {

	namespace App {
		interface Locals {
			user: UserWithoutPassword | null;
			session: Session | null;
		}
	}
}

export {};
