<script lang="ts">
    import DataTable from '$lib/components/admin/table/DataTable.svelte';
    import type { PageData } from './$types';
    import { Pen, Plus, X } from 'lucide-svelte';
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    import { TableHandler } from '@vincjo/datatables';

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const table = new TableHandler(data.news, { rowsPerPage: 10 });
</script>

<ReturnButton href="/admin" display="Admin"/>

<DataTable {table} class="text-black">
    <div class="flex flex-col items-stretch gap-4">
        {#each table.rows as news}
            <div class="bg-white rounded-md p-4 flex flex-col items-stretch gap-4">
                <div class="flex flex-row items-center justify-between">
                    <div class="font-sstv text-2xl">#{news.id} - {news.title}</div>
                    <div class="text-sm">{news.date?.toLocaleString('en-US', {})}</div>
                </div>
                <div class="font-mono">{@html news.message ? news.message.replace(/\r\n|\r|\n/g,"<br/>") : "No message"}</div>
                <div class="flex flex-row items-center justify-end gap-2">
                    <div class:bg-green-200={news.sent} class:bg-red-200={!news.sent} class="p-1 px-2 rounded-md text-xs">
                        {#if news.sent}
                        Sent
                        {:else}
                        Not sent
                        {/if}
                    </div>
                    <a href="/admin/news/{news.id}" class="p-1 px-2 rounded-md bg-blue-600 hover:bg-blue-800 text-white flex flew-row items-center gap-1 flex-nowrap">
                        <div><Pen size={9}/></div>
                        <div class="text-xs">Modify</div>
                    </a>
                    <form action="?/delete" method="post">
                        <input type="number" class="hidden" name="id" value="{news.id}"/>
                        <button class="p-1 px-2 rounded-md bg-red-600 hover:bg-red-800 text-white flex flew-row items-center gap-1 flex-nowrap">
                            <div><X size={14}/></div>
                            <div class="text-xs">Delete</div>
                        </button>
                    </form>
                </div>
            </div>
        {/each}
    </div>
</DataTable>

<a href="/admin/news/add" class="fixed bottom-3 right-3 z-30 btn-icon variant-filled bg-blue-800 shadow-lg"><Plus size="28"/></a>