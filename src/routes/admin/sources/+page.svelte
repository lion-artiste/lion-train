<script lang="ts">
    import DataTable from '$lib/components/admin/table/DataTable.svelte';
    import Th from "$lib/components/admin/table/Th.svelte";
    import ThFilter from '$lib/components/admin/table/ThFilter.svelte';
    import type { PageData } from './$types';
    import LinkBlock from '$lib/components/admin/blocks/LinkBlock.svelte';
    import { Pen, Plus, X } from 'lucide-svelte';
    import AudioBlock from '$lib/components/admin/blocks/AudioBlock.svelte';
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    import { TableHandler } from '@vincjo/datatables';

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const table = new TableHandler(data.sources, { rowsPerPage: 10 });
</script>

<ReturnButton href="/admin" display="Admin"/>

<DataTable {table} class="text-black">
    <div class="table-container">

        <table class="table table-hover max-w-full text-black">
            <thead>
                <tr>
                    <Th>Name</Th>
                    <Th>Author</Th>
                    <Th>Link</Th>
                    <Th>Audio</Th>
                    <Th>Actions</Th>
                </tr>
                <tr>
                    <ThFilter {table} field="name"/>
                    <ThFilter {table} field="author"/>
                    <ThFilter {table} field="link"/>
                    <ThFilter {table} field="audio" />
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as source}
                    <tr>
                        <td style="vertical-align:middle">{source.name}</td>
                        <td style="vertical-align:middle">{source.author}</td>
                        <td style="vertical-align:middle"><LinkBlock href={source.link} display="button">Link</LinkBlock></td>
                        <td style="vertical-align:middle relative">
                            {#if source.audio}
                            <AudioBlock source={source.audio}/>
                            {/if}
                        </td>
                        <td style="vertical-align:middle">
                            <div class="flex flex-row items-center gap-1">
                                <a href="/admin/sources/{source.id}" class="rounded-full p-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors"><Pen size="12"/></a>
                                <form action="?/delete" method="post">
                                    <input type="number" class="hidden" name="id" value="{source.id}"/>
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

<a href="/admin/sources/add" class="fixed bottom-3 right-3 z-30 btn-icon variant-filled bg-blue-800 shadow-lg"><Plus size="28"/></a>