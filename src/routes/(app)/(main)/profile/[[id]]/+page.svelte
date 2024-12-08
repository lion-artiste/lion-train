<script lang="ts">
    import Avatar from '$lib/components/layout/Avatar.svelte';
    import GameFont from '$lib/games/helpers/components/text/GameFont.svelte';
    import GameFont2 from '$lib/games/helpers/components/text/GameFont2.svelte';
    import type { PageData } from './$types';
    import GAMES_LIST from '$lib/games/gamesList';
    import TextButton from '$lib/games/helpers/components/buttons/TextButton.svelte';

    let { data }: { data: PageData } = $props();

    let user = $derived(data.profileUser ?? undefined);
    let isMine = $derived(data.isMine);

    let lastGamesPlayed = $derived(data.lastGamesPlayed.map((score) => {
        let game = GAMES_LIST.find((g) => {return (g.id == score.game)});
        return {...score, infos: game ?? null}
    }))

    const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'short', numeric: 'auto' });

    function daysAgo(date: Date) {
        // Get the current date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get the provided date at midnight
        const inputDate = new Date(date);
        inputDate.setHours(0, 0, 0, 0);

        // Convert the difference in time to days
        const diffInDays = Math.floor((today.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24));
        console.log(diffInDays);

        // Return the negative difference
        return -diffInDays;
        }
</script>

<div class="flex flex-row items-start flex-wrap gap-4 justify-stretch w-full max-w-[1500px] overflow-x-auto">

    <!--Colonne 1-->
    <div class="flex flex-col items-stretch justify-start gap-4 grow">

        <!--Personal infos-->
        <div class="bg-slate-200 rounded-md p-2 flex flex-row flex-wrap items-start w-full text-black gap-2">
            <div>
                {#if isMine}
                <a href="/profile/editor">
                    <Avatar {user} size={120}/>
                </a>
                {:else}
                    <Avatar {user} size={120}/>
                {/if}
            </div>
            <div class="flex flex-col items-start gap-0">
                <div class="text-nowrap"><GameFont>{user?.name?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}</GameFont></div>
                {#if data.profileUser.tag}
                <div class="text-nowrap"><GameFont2>@{user.tag}</GameFont2></div>
                {/if}
                <div class="mb-3"></div>
                <div class="text-nowrap"><GameFont2>Joined : {user.date_signup?.toLocaleDateString('en-EN', { day: 'numeric', month: 'long', year: 'numeric'})}</GameFont2></div>
                <div class="text-nowrap"><GameFont2>{data.numberGamesPlayed} games played</GameFont2></div>
            </div>
        </div>
    </div>

    <!--Colonne 2-->
    <div class="flex flex-col items-stretch justify-start gap-4 grow">

        <!--Last games played-->
        <div class="bg-slate-200 rounded-md p-4 flex flex-col items-stretch gap-4 w-full">
            <div class="self-center text-black text-nowrap"><GameFont>Last games played</GameFont></div>
            <div class="grid grid-cols-[min-content_1fr_min-content] items-center w-full text-black gap-x-8 gap-y-2 bg-white rounded-md p-2">
                {#if lastGamesPlayed.length == 0}
                    <div class="col-start-2 col-end-3 text-center"><GameFont2><i class="text-nowrap">No games played</i></GameFont2></div>
                {:else}
                    {#each lastGamesPlayed as score, i}
                        <div class="flex flex-row items-center gap-2 flex-nowrap">
                            <div style:background-color={score.infos?.main_color} class="h-3 w-3 rounded-full"></div>
                            <div><GameFont2>{score.infos?.name}</GameFont2></div>
                        </div>
                        <div><GameFont2>{score.date ? rtf1.format(daysAgo(score.date), "days") : ""}</GameFont2></div>
                        <div class="text-end"><GameFont2>{score.points}</GameFont2></div>
                    {/each}
                {/if}
            </div>
            <!--
                <div class="self-center"><TextButton class="p-2">See more</TextButton></div>
            -->
        </div>
    </div>

    
</div>