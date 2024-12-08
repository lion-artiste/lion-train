<script lang="ts">
    // Source : https://css-tricks.com/an-auto-filling-css-grid-with-max-columns/

    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

    interface Props {
        columns?: number;
        gap?: number;
        minWidth?: number;
        class?: string;
        children?: Snippet
    }

    let { columns = 3, gap = 10, minWidth = 500, class: classname, children}: Props = $props();

</script>

<div style="--grid-layout-gap: {gap}px;--grid-column-count: {columns};--grid-item--min-width: {minWidth}px;" class={cn("grid-container overflow-x-auto", classname)}>
    {@render children?.()}
</div>

<style>
    .grid-container {
        /**
        * User input values.
        --grid-layout-gap: 10px;
        --grid-column-count: 4;
        --grid-item--min-width: 400px;
        */

        /**
        * Calculated values.
        */
        --gap-count: calc(var(--grid-column-count) - 1);
        --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
        --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
        grid-gap: var(--grid-layout-gap);
}
</style>