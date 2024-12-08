<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        class?: string;
        children?: Snippet;
    }

    let { class: className = "", children }: Props = $props();
    
</script>

<div class="clignoter {className}">
    {@render children?.()}
</div>

<style>
    @keyframes clignoter {
        0%,49.99% {
            opacity: 1;
        }
    
        50%, 99.99% {
            opacity: 0;
        }
    }
    
    .clignoter {
        animation: clignoter 1.2s linear infinite;
    }
</style>