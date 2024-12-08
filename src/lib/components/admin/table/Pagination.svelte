<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
    import { cn } from "$lib/utils";
    import type { TableHandler } from "@vincjo/datatables";

    /*import type { DataHandler, Row } from '@vincjo/datatables/legacy';

    type T = $$Generic<Row>

    export let handler: DataHandler<T>
    export let small = false

    const pageNumber = handler.getPageNumber()
    const pageCount = handler.getPageCount()
    const pages = handler.getPages({ ellipsis: true })*/

    interface Props {
        table: TableHandler;
        small?: boolean;
        class?: string;
    }

    let { table, small = false, class: className }: Props = $props();
</script>

<section class={cn("btn-group variant-filled bg-slate-300 text-black [&_.disabled]:!text-slate-500", className)}>
    {#if small}
        <button
            type="button"
            class="small"
            class:disabled={table.currentPage === 1}
            onclick={() => table.setPage(1)}
        >
            &#10092;&#10092;
        </button>
        <button
            type="button"
            class:disabled={table.currentPage === 1}
            onclick={() => table.setPage('previous')}
        >
            &#10094;
        </button>
        <button
            class:disabled={table.currentPage === table.pageCount}
            onclick={() => table.setPage('next')}
        >
            &#10095;
        </button>
        <button
            class="small"
            class:disabled={table.currentPage === table.pageCount}
            onclick={() => table.setPage('last')}
        >
            &#10093;&#10093;
        </button>
    {:else}
        <button
            type="button"
            class:disabled={table.currentPage === 1}
            onclick={() => table.setPage('previous')}
        >
            Previous
        </button>
        {#each table.pagesWithEllipsis as page}
            <button
                type="button"
                class:active={page === table.currentPage}
                class:ellipse={page === null}
                onclick={() => table.setPage(page)}
            >
                {page ?? '...'}
            </button>
        {/each}
        <button
            type="button"
            class:disabled={table.currentPage === table.pageCount}
            onclick={() => table.setPage('next')}
        >
            Next
        </button>
    {/if}
</section>

<style>
</style>
