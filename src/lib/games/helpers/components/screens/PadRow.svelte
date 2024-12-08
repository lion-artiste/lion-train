<script lang="ts">
    interface Props {
        class?: string;
        children?: import('svelte').Snippet;
    }

    let { class: className = "", children }: Props = $props();
    
</script>

<div class="self-stretch justify-self-stretch h-full w-full flex flex-row items-stretch justify-stretch {className}">
    {@render children?.()}
</div>