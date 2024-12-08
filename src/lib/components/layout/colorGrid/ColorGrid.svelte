<script lang="ts">
    import { type ColorGrid, type COLORS, COLORTABLE } from "./ColorGrid";

    interface Props {
        colorGrid: ColorGrid
    }

    let { colorGrid }: Props = $props();
</script>

<div style:grid-template-columns={`repeat(${colorGrid[0].length},1fr)`} style:grid-template-rows={`repeat(${colorGrid.length},1fr)`} class="grid h-full w-full">
    {#each colorGrid as row}
        {#each row as color}
            <div style:background-color={COLORTABLE[color]}></div>
        {/each}
    {/each}
</div>