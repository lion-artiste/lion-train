<script lang="ts">
    import type { PageData } from "./$types";
    import SettingsBox from "$lib/games/helpers/settings/components/SettingsBox.svelte";
    import Slider from "$lib/games/helpers/settings/components/Slider.svelte";
    import type { GAME_INFOS, GAME_PARAMETERS, INTEGER_PARAMETER } from "$lib/games/helpers/types";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

</script>

<SettingsBox parameters={data.parameters} infos={data.infos}>
    {#snippet sliders(infos: GAME_INFOS, parameters: GAME_PARAMETERS, onchange: (id: string, value: number) => void, onreset: (id: string) => void)}
    <Slider url_id="nb_games" parameter={parameters.nb_games} {onchange} {onreset}/>
    <Slider url_id="min_pan" parameter={parameters.min_pan as INTEGER_PARAMETER} max={parameters.max_pan.value as number} {onchange} {onreset}/>
    <Slider url_id="max_pan" parameter={parameters.max_pan as INTEGER_PARAMETER} min={parameters.min_pan.value as number} {onchange} {onreset}/>
    <Slider url_id="w_begin" parameter={parameters.w_begin as INTEGER_PARAMETER} {onchange} {onreset}/>
    <Slider url_id="w_end" parameter={parameters.w_end as INTEGER_PARAMETER} {onchange} {onreset}/>
    {/snippet}
</SettingsBox>

