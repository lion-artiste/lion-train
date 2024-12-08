<script lang="ts">
    import type { HTMLTextareaAttributes } from "svelte/elements";

    interface Props extends HTMLTextareaAttributes {};
    let {
        ...rest
    } = $props();
</script>

<textarea class="rounded-lg p-2 w-full bg-white text-black" {...rest}></textarea>