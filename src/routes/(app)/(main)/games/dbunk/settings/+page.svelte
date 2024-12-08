<script lang="ts">
    import type { PageData } from "./$types";
    import SettingsBox from "$lib/games/helpers/settings/components/SettingsBox.svelte";
    import Slider from "$lib/games/helpers/settings/components/Slider.svelte";
    import type { FLOAT_PARAMETER, GAME_INFOS, GAME_PARAMETERS, INTEGER_PARAMETER } from "$lib/games/helpers/types";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

</script>

<SettingsBox parameters={data.parameters} infos={data.infos}>
    {#snippet sliders(infos: GAME_INFOS, parameters: GAME_PARAMETERS, onchange: (id: string, value: number) => void, onreset: (id: string) => void)}
    <Slider url_id="nb_games" parameter={parameters.nb_games} {onchange} {onreset}/>
    <Slider url_id="min_gain" parameter={parameters.min_gain as INTEGER_PARAMETER} max={parameters.max_gain.value as number} {onchange} {onreset}/>
    <Slider url_id="max_gain" parameter={parameters.max_gain as INTEGER_PARAMETER} min={parameters.min_gain.value as number} {onchange} {onreset}/>
    <Slider url_id="min_diff" parameter={parameters.min_diff as INTEGER_PARAMETER} max={parameters.max_diff.value as number} {onchange} {onreset}/>
    <Slider url_id="max_diff" parameter={parameters.max_diff as INTEGER_PARAMETER} min={parameters.min_diff.value as number} {onchange} {onreset}/>
    {/snippet}
</SettingsBox>

