<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
    import { cn } from "$lib/utils";
    import type { TableHandler } from "@vincjo/datatables";

    /*import type { DataHandler, Row } from '@vincjo/datatables/legacy';

    type T = $$Generic<Row>

    export let handler: DataHandler<T>;
    export let small = false;
    const rowCount = handler.getRowCount()*/

    interface Props {
        table: TableHandler;
        small?: boolean;
        class?: string;
    }

    let { table, small = false, class: className }: Props = $props();

    const { start, end, total } = $derived(table.rowCount);

</script>

<aside class={cn("text-white", className)}>
    {#if small}
        {#if total > 0}
            <b>{start}</b>-<b>{end}</b>/<b>{total}</b>
        {:else}
            No entries
        {/if}
    {:else if total > 0}
        Showing <b>{start}</b> to <b>{end}</b> of <b>{total}</b> entries
    {:else}
        No entries found
    {/if}
</aside>
