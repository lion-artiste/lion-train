<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts" generics="T">
    import type { DataHandler, Row} from '@vincjo/datatables/legacy';
    import type { TableHandler } from '@vincjo/datatables';
    import Search from "./Search.svelte";
    import RowsPerPage from "./RowsPerPage.svelte";
    import RowCount from './RowCount.svelte';
    import Pagination from './Pagination.svelte';
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';

    //type T = $$Generic<Row>

    interface Props {
        //handler: DataHandler<T>;
        table: TableHandler;
        search?: boolean;
        rowsPerPage?: boolean;
        rowCount?: boolean;
        pagination?: boolean;
        class?: string;
        children?: Snippet;
    }

    let { table, search = true, rowsPerPage = true, rowCount = true, pagination = true, class : classname, children }: Props = $props();

    let element: HTMLElement | null = $state(null);
    let clientWidth = $state(1000);

    let height = $derived( (search || rowsPerPage ? 48 : 8) + (rowCount || pagination ? 48 : 8) );

    /*handler.on('change', () => {
        if (element) element.scrollTop = 0;
    })*/

</script>

<section bind:clientWidth class={cn("flex flex-col gap-3 items-stretch justify-stretch", classname)}>
    <header class="flex flex-row justify-between flex-wrap items-center w-full" class:container={search || rowsPerPage}>
        {#if search}
            <Search {table} />
        {/if}
        {#if rowsPerPage}
            <RowsPerPage {table} small={clientWidth < 600} />
        {/if}
    </header>

    <article bind:this={element} style="height:calc(100% - {height}px)">
        {@render children?.()}
    </article>

    <footer class="flex flex-row justify-between flex-wrap items-center" class:container={rowCount || pagination}>
        {#if rowCount}
            <RowCount {table} small={clientWidth < 600} />
        {/if}
        {#if pagination}
            <Pagination {table} small={clientWidth < 600} />
        {/if}
    </footer>
</section>