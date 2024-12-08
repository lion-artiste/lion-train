<script lang="ts">
    import GameFont2 from './text/GameFont2.svelte';

    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<div class="flex flex-row items-baseline gap-y-2 gap-x-2">
    <div class="hidden sm:block">
        <GameFont2 class="text-[13px]">Score :</GameFont2>
    </div>
    <div>
        <GameFont2 class="text-[16px]">{@render children?.()}</GameFont2>
    </div>
</div>