<script lang="ts">
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';

    interface Props {
        class?: string;
        children?: Snippet;
    }

    let {
        class: className,
        children
    }: Props = $props();
    
</script>

<span class={cn("font-gaming text-xs", className)}>
    {@render children?.()}
</span>