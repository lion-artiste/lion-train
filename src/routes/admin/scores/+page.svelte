<script lang="ts">
    import { TableHandler } from '@vincjo/datatables';
    import DataTable from '$lib/components/admin/table/DataTable.svelte';
    import type { PageData } from './$types';
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    import GAMES_LIST from '$lib/games/gamesList';
    import GameFont2 from '$lib/games/helpers/components/text/GameFont2.svelte';
    import DateTimeBlock from '$lib/components/admin/blocks/DateTimeBlock.svelte';
    import UserBlock from '$lib/components/admin/blocks/UserBlock.svelte';
    import { Earth, User } from 'lucide-svelte';

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let scoresWithInfos = $derived(data.scores.map((score) => {
        let game = GAMES_LIST.find((g) => {return (g.id == score.game)});
        return {...score, infos: game ?? null}
    }))

    const table = $derived(new TableHandler(scoresWithInfos, { rowsPerPage: 10 }));
</script>

<ReturnButton href="/admin" display="Admin"/>

<DataTable {table} class="text-black">

    <div class="flex flex-col items-stretch gap-2">
        {#each table.rows as score}
        <div style:background-color={score.infos?.main_color} class="text-white rounded-md flex flex-row items-center justify-between gap-2 p-2 w-full border-4 border-slate-300 flex-wrap">
            <div class="flex flex-row items-center gap-2">
                <div style:background-color={score.infos?.main_color} class="h-3 w-3 rounded-full"></div>
                <div><GameFont2>{score.infos?.name}</GameFont2></div>
            </div>
            <div><UserBlock user={score.user}/></div>
            <div><GameFont2>{score.points}</GameFont2></div>
            <div class="flex flex-row items-center gap-4">
                <div class="flex flex-row items-center gap-2">
                    <User size={20}/>
                    <GameFont2>{score.personal_rank ?? "-"}/{score.personal_total ?? "-"}</GameFont2>
                </div>
                <div class="flex flex-row items-center gap-2">
                    <Earth size={20}/>
                    <GameFont2>{score.world_rank ?? "-"}/{score.world_total ?? "-"}</GameFont2>
                </div>
            </div>
            <div><GameFont2><DateTimeBlock value={score.date}/></GameFont2></div>
        </div>
        {/each}
    </div>

</DataTable>