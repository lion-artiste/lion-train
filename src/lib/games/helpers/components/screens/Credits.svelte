<script lang="ts">
    import type { Source } from "@prisma/client";

    import GameFont from "../text/GameFont.svelte";
    interface Props {
        source?: Source | null;
    }

    let { source = null }: Props = $props();

</script>

{#if source}
<div><GameFont>You are listening to :</GameFont></div>
<div><GameFont class="my-2 text-4xl">{source?.name}, <span class="text-2xl">by {source?.author}</span></GameFont></div>
<div><GameFont class=""><a href={source?.link} class="underline" target="_blank">Link</a></GameFont></div>
{/if}