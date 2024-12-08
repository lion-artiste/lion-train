<script lang="ts">
    import GameCard from "./GameCard.svelte";
    import type { PageData } from './$types';
    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let gamesDisplay = $derived(data.games.filter( ({ id }) => data.gamesUser.includes(id) ))
</script>

<div class="flex flex-row flex-wrap gap-7 justify-center">
    {#each gamesDisplay as infos}
        <GameCard {infos} />
    {/each}
</div>
