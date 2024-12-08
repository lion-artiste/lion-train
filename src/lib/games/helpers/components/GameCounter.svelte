<script lang="ts">
    import GameFont2 from "./text/GameFont2.svelte";

    interface Props {
        step?: number;
        total: number;
    }

    let { step = 0, total }: Props = $props();
</script>

<div class="flex flex-row items-center flex-nowrap gap-2">
    <GameFont2 class="text-[16px]">
        <span>{step}</span>
        <span>/</span>
        <span>{total}</span>
    </GameFont2>
</div>