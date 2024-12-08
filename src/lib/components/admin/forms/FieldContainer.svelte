<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title: Snippet;
        content: Snippet;
    }

    let {
        title,
        content
    }: Props = $props();
</script>

<div class="px-3 py-2 bg-blue-900 text-white flex flex-col items-start gap-2 rounded-md">
    <div>{@render title?.()}</div>
    {@render content?.()}
</div>