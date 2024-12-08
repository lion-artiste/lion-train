<script lang="ts">
    import type { GAME_INFOS, GAME_PARAMETERS } from "$lib/games/helpers/types";
    import type { Snippet } from "svelte";
    import BackToGameButton from "./BackToGameButton.svelte";
    import ResetAllButton from "./ResetAllButton.svelte";

    interface Props {
        sliders?: Snippet,
        other?: Snippet,
        bottomLeft?: Snippet,
        bottomCenter?: Snippet,
        bottomRight?: Snippet,
    }

    let { sliders, other, bottomLeft, bottomCenter, bottomRight }: Props = $props();

</script>

<div class="bg-slate-200 rounded-md p-6 text-black">
    <div class="flex flex-col gap-y-10">
        {@render sliders?.()}
    </div>
    <div>
        {@render other?.()}
    </div>
    
    <div class="grid grid-cols-[1fr_min-content_1fr] gap-x-3 justify-items-center items-center mt-10 text-black">
        <div class="flex flex-row justify-left items-left justify-self-end">
            {@render bottomLeft?.()}
        </div>
        <div>
            {@render bottomCenter?.()}
        </div>
        <div class="flex flex-row justify-left items-left justify-self-start">
            {@render bottomRight?.()}
        </div>
    </div>
</div>