<script lang="ts">
    import { cn } from '$lib/utils';
    import GameFont from './text/GameFont.svelte';

    interface Props {
        show?: boolean;
        win?: boolean;
        lose?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        show = false,
        win = false,
        lose = false,
        children
    }: Props = $props();
</script>

<div class={cn([show ? "opacity-100" : "opacity-0", win ? "text-green-600" : ""])}>
    <GameFont class="text-3xl">
        {#if win}+{/if}
        {#if lose}-{/if}
        {@render children?.()}
    </GameFont>
</div>