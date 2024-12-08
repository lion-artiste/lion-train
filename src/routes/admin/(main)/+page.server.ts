import prisma from '$lib/common/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {

    let nbSources: number = await fetch("/api/admin/sources/count").then((response) => response.json()).then((data) => Number(data));
    let nbScores: number = await fetch("/api/admin/scores/count").then((response) => response.json()).then((data) => Number(data));
    let nbUsers: number = await fetch("/api/admin/users/count").then((response) => response.json()).then((data) => Number(data));
    let nbPlaylists: number = await fetch("/api/admin/playlists/count").then((response) => response.json()).then((data) => Number(data));

    // Minimum date for some charts
    let daysAnalysis = 10;
    let dateMinimum = new Date();
    dateMinimum.setDate(dateMinimum.getDate() - daysAnalysis + 1);
    dateMinimum.setHours(0,0,0,0);
    
    // Get infos for Games played chart
    let signalsGameStarted = await prisma.signal.findMany({
        where: {
            code: "game:started",
            date: {
                not: null,
                gte: dateMinimum
            }
        },
        orderBy: {
            date: "asc"
        }
    });

    //console.log(dateMinimum)

    let gamesStartedAnonymous = 0;
    let gamesStartedUsers = 0;
    let gamesStartedByDay: {date: string, countAnon: number, countUser: number}[] = [];

    for (let i = 0; i < daysAnalysis; i++) {
        let date = new Date(dateMinimum.getTime());
        date.setDate(dateMinimum.getDate() + i);
        //console.log(date)
        date.setHours(0,0,0,0);
        let signalsThatDate = signalsGameStarted.filter(signal => {
            if (!signal.date) return false;
            signal.date.setHours(0,0,0,0);
            return (signal.date.getTime() == date.getTime())
        });

        let countUser = signalsThatDate.filter(el => el.userId).length;
        let countAnon = signalsThatDate.filter(el => !el.userId).length;

        gamesStartedByDay.push({date: date.toISOString(), countUser, countAnon});
    }

    //console.log(gamesStartedByDay)

    gamesStartedUsers = signalsGameStarted.filter(signal => signal.userId).length;
    gamesStartedAnonymous = signalsGameStarted.filter(signal => !signal.userId).length;

    let maxDayGamesPlayed: number = Math.max(...gamesStartedByDay.map((el) => {return el.countAnon + el.countUser}))

    //console.log(gamesStartedByDay);
    
    return {
        nbSources,
        nbScores,
        nbUsers,
        nbPlaylists,
        gamesStartedByDay,
        daysAnalysis, 
        gamesStartedAnonymous,
        gamesStartedUsers,
        maxDayGamesPlayed,
        dateMinimum
    };
    
}) satisfies PageServerLoad;