<script lang="ts">
    import GameFont from "$lib/games/helpers/components/text/GameFont.svelte";
    import type { SCORE_STATS } from "../../types";
    import { statsNull } from "../../functions";
    import BlinkingText from "../text/BlinkingText.svelte";
    import GameStats from "../GameStats.svelte";

    interface Props {
        loggedIn?: boolean;
        stats?: SCORE_STATS;
        onrestart?: () => void
    }

    let { loggedIn = false, stats = statsNull, onrestart = () => {} }: Props = $props();
</script>

<GameFont class="text-black">End of game</GameFont>
{#if loggedIn}
    <GameStats {stats} />
{:else}
    <div class="text-black">Please <a href="/login" class="link">login</a> or register in order to save your scores</div>
{/if}
<div>
    <BlinkingText>
        <GameFont>
            <button onclick={() => onrestart()} class="cursor-pointer text-black">Restart</button>
        </GameFont>
    </BlinkingText>
</div>