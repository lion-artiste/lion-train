<script lang="ts">
    import { Cog, Headphones, Radio, ScrollText, Target, User } from 'lucide-svelte';
    import type { PageData } from './$types';
    import AutoResizeGrid from '$lib/components/layout/AutoResizeGrid.svelte';
    import GameFont from '$lib/games/helpers/components/text/GameFont.svelte';
    import GameFont2 from '$lib/games/helpers/components/text/GameFont2.svelte';
    import PillLink from './PillLink.svelte';
    
    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
</script>

<div class="flex flex-row items-center justify-center gap-2 flex-wrap">
    <PillLink href="/admin/scores">
        {#snippet icon(size)}<Target {size}/>{/snippet}
        {data.nbScores} Score{#if data.nbScores != 1}s{/if}
    </PillLink>
    <PillLink href="/admin/sources">
        {#snippet icon(size)}<Headphones {size}/>{/snippet}
        {data.nbSources} Source{#if data.nbSources != 1}s{/if}
    </PillLink>
    <PillLink href="/admin/playlists">
        {#snippet icon(size)}<ScrollText {size}/>{/snippet}
        {data.nbPlaylists} Playlist{#if data.nbPlaylists != 1}s{/if}
    </PillLink>
    <PillLink href="/admin/users">
        {#snippet icon(size)}<User {size}/>{/snippet}
        {data.nbUsers} User{#if data.nbUsers != 1}s{/if}
    </PillLink>
    <PillLink href="/admin/logs">
        {#snippet icon(size)}<Cog {size}/>{/snippet}
        Logs
    </PillLink>
    <PillLink href="/admin/signals">
        {#snippet icon(size)}<Radio {size}/>{/snippet}
        Signals
    </PillLink>
</div>

<AutoResizeGrid class="my-10">
    <div class="bg-slate-200 rounded-md px-8 py-5 border-0 flex flex-col items-stretch justify-start gap-6">
        <div class="font-bold text-xl self-center"><GameFont>Games played</GameFont></div>
        <div class="grow flex flex-col items-stretch gap-2">     
            <div style:grid-template-columns={`repeat(${data.daysAnalysis}, 1fr)`} class="bg-white h-[250px] pt-1 grid items-stretch justify-items-stretch gap-1">
                {#each data.gamesStartedByDay as day}
                <div class="flex flex-col items-stretch justify-end">
                    <div style:height={`${day.countAnon / data.maxDayGamesPlayed * 100}%`} class="bg-yellow-500"></div>
                    <div style:height={`${day.countUser / data.maxDayGamesPlayed * 100}%`} class="bg-blue-500"></div>
                </div>
                {/each}
            </div>
            <div style:grid-template-columns={`repeat(${data.daysAnalysis}, 1fr)`} class="grid items-stretch justify-items-stretch gap-1">
                {#each data.gamesStartedByDay as day}
                <div class="flex flex-col items-center justify-items-center gap-1">
                    <div class="text-blue-500"><GameFont2>{day.countUser}</GameFont2></div>
                    <div class="text-yellow-600"><GameFont2>{day.countAnon}</GameFont2></div>
                </div>
                {/each}
            </div>
            <div class="flex flex-row items-center justify-between gap-4 text-sm">
                <div><GameFont2>{data.dateMinimum.toLocaleDateString("en-US", {day:"numeric", month:"short"})}</GameFont2></div>
                <div><GameFont2>{(new Date()).toLocaleDateString("en-US", {day:"numeric", month:"short"})}</GameFont2></div>
            </div>
        </div>
    </div>

    <div class="bg-slate-200 rounded-md px-8 py-5 border-0 flex flex-col items-stretch justify-start gap-6">
        <div class="font-bold text-xl self-center"><GameFont>Last {data.daysAnalysis} days</GameFont></div>
        <div class="flex flex-col items-stretch justify-start gap-2">
            <div class="flex flex-row w-full items-stretch justify-start bg-yellow-500 h-10">
                <div style:width={`${Math.round(data.gamesStartedUsers / (data.gamesStartedAnonymous + data.gamesStartedUsers) * 100)}%`} class="bg-blue-500"></div>
            </div>
            <div class="flex flex-row items-center justify-between gap-4 text-sm">
                <div class="text-blue-500"><GameFont2>{Math.round(data.gamesStartedUsers / (data.gamesStartedAnonymous + data.gamesStartedUsers) * 100)}% Users</GameFont2></div>
                <div class="text-yellow-600"><GameFont2>{Math.round(data.gamesStartedAnonymous / (data.gamesStartedAnonymous + data.gamesStartedUsers) * 100)}% Anons</GameFont2></div>
            </div>
            <div class="flex flex-row items-center justify-between gap-4 text-sm">
                <div class="text-blue-500"><GameFont2>{data.gamesStartedUsers} Games</GameFont2></div>
                <div class="text-yellow-600"><GameFont2>{data.gamesStartedAnonymous} Games</GameFont2></div>
            </div>
        </div>
    </div>

</AutoResizeGrid>