<script lang="ts">
    import DataTable from '$lib/components/admin/table/DataTable.svelte';
    import Th from "$lib/components/admin/table/Th.svelte";
    import ThFilter from '$lib/components/admin/table/ThFilter.svelte';
    import type { PageData } from './$types';
    import BooleanBlock from '$lib/components/admin/blocks/BooleanBlock.svelte';
    import LongTextBlock from '$lib/components/admin/blocks/LongTextBlock.svelte';
    import { Pen, Plus, X } from 'lucide-svelte';
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    import { TableHandler } from '@vincjo/datatables';

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const table = new TableHandler(data.playlists, { rowsPerPage: 10 });
</script>

<ReturnButton href="/admin" display="Admin"/>

<DataTable {table} class="text-black">
    <div class="table-container">

        <table class="table table-hover max-w-full text-black">
            <thead>
                <tr>
                    <Th>Name</Th>
                    <Th>Description</Th>
                    <Th>Default ?</Th>
                    <Th>Sources</Th>
                    <Th>Actions</Th>
                </tr>
                <tr>
                    <ThFilter {table} field="name"/>
                    <ThFilter {table} field="description"/>
                    <ThFilter {table} field="sources"/>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as playlist}
                    <tr>
                        <td style="vertical-align:middle">
                            <div class="flex flex-col">
                                <div class="font-bold">{playlist.name}</div>
                                <div class="text-xs">{playlist.slug}</div>
                            </div>
                        </td>
                        <td style="vertical-align:middle"><LongTextBlock value={playlist.description ?? ""} /></td>
                        <td style="vertical-align:middle"><BooleanBlock value={playlist.default} /></td>
                        <td style="vertical-align:middle">
                            {#each playlist.sources as source}
                            <div>{source.name}</div>
                            {/each}
                        </td>
                        <td style="vertical-align:middle">
                            <div class="flex flex-playlist items-center gap-1">
                                <a href="/admin/playlists/{playlist.id}" class="rounded-full p-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors"><Pen size="12"/></a>
                                <form action="?/delete" method="post">
                                    <input type="number" class="hidden" name="id" value="{playlist.id}"/>
                                    <button type="submit" class="rounded-full p-1 bg-red-500 text-white hover:bg-red-700 transition-colors"><X size="12"/></button>
                                </form>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</DataTable>

<a href="/admin/playlists/add" class="fixed bottom-3 right-3 z-30 btn-icon variant-filled bg-blue-800 shadow-lg"><Plus size="28"/></a>