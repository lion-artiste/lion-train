<script lang="ts">
    import { goto } from "$app/navigation";
    import TextButton from "$lib/games/helpers/components/buttons/TextButton.svelte";
    import GameFont from "../../components/text/GameFont.svelte";
    import type { GAME_INFOS, GAME_PARAMETERS } from "../../types";

    interface Props {
        infos: GAME_INFOS;
        parameters: GAME_PARAMETERS;
    }

    let { infos, parameters }: Props = $props();

    function buttonClick(infos: GAME_INFOS, parameters: GAME_PARAMETERS) {
        const params = new URLSearchParams();
        Object.entries(parameters).forEach(([url_id, parameter]) => {
            let value = parameter.value ?? parameter.default;
            params.append(url_id, value.toString());
        });
        goto("/games/" + infos.id + '/?' + params.toString());
    }
</script>

<!--<button onclick={buttonClick} class="btn btn-wide btn-lg bg-white text-black hover:bg-slate-200 border-0 hover:scale-105"><GameFont class="inline">PLAY !</GameFont></button>-->
<TextButton onclick={() => buttonClick(infos, parameters)}>
    <GameFont>Back to game</GameFont>
</TextButton>