import { GitHub, Google, Spotify } from "arctic";
import { env } from "$env/dynamic/private";
import { env as envPublic } from "$env/dynamic/public";

export const github = new GitHub(
	env.GITHUB_CLIENT_ID,
	env.GITHUB_CLIENT_SECRET
);

export const google = new Google(
	env.GOOGLE_CLIENT_ID,
	env.GOOGLE_CLIENT_SECRET,
	`${envPublic.PUBLIC_BASE_URL}/login/google/callback`
);

export const spotify = new Spotify(
	env.SPOTIFY_CLIENT_ID,
	env.SPOTIFY_CLIENT_SECRET,
	`${envPublic.PUBLIC_BASE_URL}/login/spotify/callback`
);