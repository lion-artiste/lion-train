<script lang="ts">
    import { cn } from '$lib/utils';

    interface Props {
        class?: string;
        children?: import('svelte').Snippet;
    }

    let { class: className, children }: Props = $props();
    
</script>

<span class={cn("font-sstv text-3xl", className)}>
    {@render children?.()}
</span>