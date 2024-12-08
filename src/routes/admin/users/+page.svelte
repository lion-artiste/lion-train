<script lang="ts">
    import DataTable from '$lib/components/admin/table/DataTable.svelte';
    import type { PageData } from './$types';
    import KeysBlock from '$lib/components/admin/blocks/KeysBlock.svelte';
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    import DateTimeBlock from '$lib/components/admin/blocks/DateTimeBlock.svelte';
    import Avatar from '$lib/components/layout/Avatar.svelte';
    import GameFont from '$lib/games/helpers/components/text/GameFont.svelte';
    import GameFont2 from '$lib/games/helpers/components/text/GameFont2.svelte';
    import AutoResizeGrid from '$lib/components/layout/AutoResizeGrid.svelte';
    import { TableHandler } from '@vincjo/datatables';
    
    
    interface Props {
        data: PageData;
    }
    
    let { data }: Props = $props();

    const table = new TableHandler(data.users, { rowsPerPage: 10 });
</script>

<ReturnButton href="/admin" display="Admin"/>

<DataTable {table} class="text-black">

    <AutoResizeGrid minWidth={400}>
        {#each table.rows as user}
        <div class="bg-slate-200 h-full w-full rounded-md p-4 flex flex-row items-start gap-4 flex-wrap">

            <div><a href={`/profile/@${user.tag}`}><Avatar {user} size={100}/></a></div>

            <div class="grow flex flex-col items-stretch justify-start gap-0 flex-wrap">

                <div><GameFont>{user.name?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}</GameFont></div>

                {#if user.tag}
                <div><GameFont2>@{user.tag}</GameFont2></div>
                {/if}

                <div class="h-3"></div>

                <div class="flex flex-row items-center justify-start gap-2">
                    <KeysBlock {user}/>
                    {#if user.date_signup}
                    <div class="relative top-[1px]"><GameFont2><DateTimeBlock value={user.date_signup}/></GameFont2></div>
                    {/if}
                </div>

                <div class="h-3"></div>

                <div>
                    <GameFont2>{user._count.scores} games played</GameFont2>
                </div>

            </div>
        </div>
        {/each}
    </AutoResizeGrid>
</DataTable>