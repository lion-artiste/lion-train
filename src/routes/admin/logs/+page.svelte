<script lang="ts">
    import DataTable from '$lib/components/admin/table/DataTable.svelte';
    import Th from "$lib/components/admin/table/Th.svelte";
    import ThFilter from '$lib/components/admin/table/ThFilter.svelte';
    import DateTimeBlock from '$lib/components/admin/blocks/DateTimeBlock.svelte';
    import LongTextBlock from '$lib/components/admin/blocks/LongTextBlock.svelte';
    import type { PageData } from './$types';
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    import { TableHandler } from '@vincjo/datatables';
    import type { Log } from '$lib/common/winston';

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const table = new TableHandler(data.logs, { rowsPerPage: 10 });

    const getMessage = (log: Log) => {
        let message = log.message;
        if (log.cause?.code) message = message + " CODE : " + log.cause.code;
        return message;
    }


</script>

<ReturnButton href="/admin" display="Admin"/>

<DataTable {table} class="text-black">
    <div class="table-container">

        <table class="table table-hover max-w-full text-black">
            <thead>
                <tr>
                    <Th>Level</Th>
                    <Th>Timestamp</Th>
                    <Th>Tags</Th>
                    <Th>Message</Th>
                    <Th>Origin</Th>
                </tr>
                <tr>
                    <ThFilter {table} field="level"/>
                    <ThFilter {table} field="timestamp"/>
                    <ThFilter {table} field="tags"/>
                    <ThFilter {table} field="message" />
                    <ThFilter {table} field="origin" />
                </tr>
            </thead>
            <tbody>
                {#each table.rows as log}
                    <tr class="a" class:!bg-red-200={log.level == "error"}>
                        <td style="vertical-align:middle">
                            <span class="font-bold" class:text-blue-500={log.level == "info"} class:text-red-500={log.level == "error"}>
                                {log.level.toUpperCase()}
                            </span>
                        </td>
                        <td style="vertical-align:middle"><DateTimeBlock value={log.timestamp}/></td>
                        <td style="vertical-align:middle">
                            {#if log.tags.length > 0}
                            <div class="flex flex-row flex-wrap gap-1 items-start w-40">
                                {#each log.tags as tag}
                                    <div class="badge {log.level == "error" ? "variant-filled-error" : "variant-filled-primary"}">{tag}</div>
                                {/each}
                            </div>
                            {:else}
                            -
                            {/if}
                        </td>
                        <td style="vertical-align:middle"><LongTextBlock value={getMessage(log)} lineLimit={80}/></td>
                        <td style="vertical-align:middle">{log.origin ?? "-"}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</DataTable>