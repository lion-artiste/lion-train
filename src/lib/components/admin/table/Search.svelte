<!-- @migration-task Error while migrating Svelte code: Cannot split a chunk that has already been edited (16:20 – "on:input={() => handler.search(value)}") -->
<script lang="ts">
    import { cn } from "$lib/utils";
    import type { TableHandler } from "@vincjo/datatables";

    /*import type { DataHandler, Row } from '@vincjo/datatables/legacy';

    type T = $$Generic<Row>

    export let handler: DataHandler<T>
    let value = ''

    handler.on('clearSearch', () => value = '')*/

    interface Props {
        table: TableHandler;
        class?: string;
    }

    let { table, class: className }: Props = $props();
    let search = table.createSearch();
</script>

<input
    class={cn("input w-64 rounded-lg", className)}
    bind:value={search.value}
    spellcheck="false"
    oninput={() => search.set()}
/>

<style>
</style>