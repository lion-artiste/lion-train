<script lang="ts">
    import { DEFAULTGRIDS, type ColorGrid, type COLORS } from '$lib/components/layout/colorGrid/ColorGrid';
    import ColorGridEditor from '$lib/components/layout/colorGrid/ColorGridEditor.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let colorGrid: ColorGrid = $state(data.user?.pixel_avatar ? JSON.parse(data.user.pixel_avatar) as ColorGrid : DEFAULTGRIDS[0].grid());
    let Form: HTMLFormElement | null = $state(null);
    let Input: HTMLInputElement | null = $state(null);

    function onchange(x: number, y: number, color: COLORS) {
        colorGrid[x][y] = color;
    }

    function onsave() {
        if (!Form || !Input) return;
        Input.value = JSON.stringify(colorGrid);
        Form.submit();
    }

    function onreset() {
        if (data.user?.pixel_avatar) colorGrid = JSON.parse(data.user.pixel_avatar) as ColorGrid;
    }
</script>

<div>
    <ColorGridEditor colorGrid={colorGrid} {onchange} {onsave} {onreset} />
    <form method="post" action="?/save" bind:this={Form} class="hidden">
        <input bind:this={Input} name="colorgrid"/>
    </form>
</div>