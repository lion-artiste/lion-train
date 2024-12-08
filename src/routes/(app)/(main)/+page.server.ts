import DEFAULT_GAMES from "$lib/games/default_games";
import prisma from "$lib/common/prisma";
import GAMES_LIST from "$lib/games/gamesList";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {

    let user = locals.user;

    let gamesUser = DEFAULT_GAMES as string[];
	if (user) {
		let user_games = await prisma.gameToUser.findMany({
			where: {
				user_id: user.id
			},
			select: {
				game: true
			}
		});
		if (user_games.length > 0) {
			gamesUser = user_games.map((entry) => entry.game)
		} 
	}

    return {
        title : "Choose a game",
        description: "Free and customizable ear-training games for mix engineers and music producers",
        games: GAMES_LIST,
        gamesUser
    }
    
}) satisfies PageServerLoad;