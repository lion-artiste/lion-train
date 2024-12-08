<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
    import { cn } from "$lib/utils";
    import type { TableHandler } from "@vincjo/datatables";

    /*import type { DataHandler, Row } from '@vincjo/datatables/legacy';

    type T = $$Generic<Row>

    export let handler: DataHandler<T>
    export let small = false

    const rowsPerPage = handler.getRowsPerPage()*/

    
    interface Props {
        table: TableHandler;
        class?: string;
        small?: boolean
    }
    
    let { table, class: className, small = false }: Props = $props();
    const options = [5, 10, 20, 50, 100];

</script>

<aside class={cn("text-white flex flex-row items-center gap-2", className)}>
    {#if !small}
        <span>Show</span>
    {/if}
    <select class="text-black select inline" bind:value={table.rowsPerPage} onchange={() => table.setPage(1)}>
        {#each options as option}
            <option value={option}>
                {option}
            </option>
        {/each}
    </select>
    {#if !small}
        <span>entries</span>
    {/if}
</aside>