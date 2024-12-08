<script lang="ts">
    import { run } from 'svelte/legacy';

    import type { PageData } from "./$types";
    import Slider from "$lib/games/helpers/settings/components/Slider.svelte";
    import BackToGameButton from "$lib/games/helpers/settings/components/BackToGameButton.svelte";
    import ResetAllButton from "$lib/games/helpers/settings/components/ResetAllButton.svelte";
    import Choice from "$lib/games/helpers/settings/components/Choice.svelte";
    import { tick } from 'svelte';
    import SettingsShell from '$lib/games/helpers/settings/components/SettingsShell.svelte';

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let parameters = $state(structuredClone(data.parameters));

    let game_mode = $derived(parameters.game_mode.value ?? parameters.game_mode.default);

    function resetAll() {
        Object.keys(parameters).forEach( function (id) {
            parameters[id as keyof typeof parameters].value = parameters[id as keyof typeof parameters].default
        });
    }

    function onchange(id: string, value: number | string) {
        if (id in parameters) {
            parameters[id as keyof typeof parameters].value = value as number | "attack" | "release" | "ratio" | "knee" | "threshold";
        }
    }

    function onreset(id: string) {
        if (id in parameters) {
            parameters[id as keyof typeof parameters].value = parameters[id as keyof typeof parameters].default
        }
    }

    async function handleGameModeChange(id: string, value: string) {
        onchange(id, value);
        parameters.min_value.default = parameters[game_mode].min;
        parameters.min_value.value = parameters[game_mode].min;
        parameters.max_value.default = parameters[game_mode].max;
        parameters.max_value.value = parameters[game_mode].max;
        parameters.max_diff.default = Math.abs(parameters[game_mode].max - parameters[game_mode].min);
        parameters.max_diff.value = Math.abs(parameters[game_mode].max - parameters[game_mode].min);
        switch (game_mode) {
            case "threshold":
                parameters.min_diff.value = 5;
                parameters.min_diff.default = 5;
                break;
            case "attack":
                parameters.min_diff.value = 150;
                parameters.min_diff.default = 150;
                break;
            case "release":
                parameters.min_diff.value = 200;
                parameters.min_diff.default = 200;
                break;
            case "ratio":
                parameters.min_diff.value = 4;
                parameters.min_diff.default = 4;
                break;
            case "knee":
                parameters.min_diff.value = 10;
                parameters.min_diff.default = 10;
                break;
        
            default:
                break;
        }
    }
</script>

<SettingsShell>
    {#snippet sliders()}
        <Choice url_id="game_mode" parameter={parameters.game_mode} onchange={(id: string, value: string) => handleGameModeChange(id, value)} {onreset}/>

        <Slider url_id="nb_games" parameter={parameters.nb_games} {onchange} {onreset}/>
        <Slider url_id="min_value" parameter={parameters.min_value} min={parameters[game_mode].min} max={Math.min(parameters[game_mode].max, parameters.max_value.value ?? parameters.max_value.default)} title="Min {game_mode}" unit={(["attack","release"].includes(game_mode)) ? "ms" : "db"} {onchange} {onreset}/>
        <Slider url_id="max_value" parameter={parameters.max_value} min={Math.max(parameters[game_mode].min, parameters.min_value.value ?? parameters.min_value.default)} max={parameters[game_mode].max}  title="Max {game_mode}" unit={(["attack","release"].includes(game_mode)) ? "ms" : "db"} {onchange} {onreset}/>
        <Slider url_id="min_diff" parameter={parameters.min_diff} max={Math.min(parameters.max_diff.value ?? parameters.min_diff.min, Math.round(Math.abs(parameters[game_mode].max - parameters[game_mode].min)))} unit={(["attack","release"].includes(game_mode)) ? "ms" : "db"} {onchange} {onreset}/>
        <Slider url_id="max_diff" parameter={parameters.max_diff} min={parameters.min_diff.value} max={Math.round(Math.abs(parameters[game_mode].max - parameters[game_mode].min))} unit={(["attack","release"].includes(game_mode)) ? "ms" : "db"} {onchange} {onreset}/>

        {#if game_mode != "threshold"}
            <Slider url_id="threshold" parameter={parameters.threshold} {onchange} {onreset}/>
        {/if}
        {#if game_mode != "attack"}
            <Slider url_id="attack" parameter={parameters.attack} {onchange} {onreset}/>
        {/if}
        {#if game_mode != "release"}
            <Slider url_id="release" parameter={parameters.release} {onchange} {onreset}/>
        {/if}
        {#if game_mode != "ratio"}
            <Slider url_id="ratio" parameter={parameters.ratio} {onchange} {onreset}/>
        {/if}
        {#if game_mode != "knee"}
            <Slider url_id="knee" parameter={parameters.knee} {onchange} {onreset}/>
        {/if}
    {/snippet}

    {#snippet bottomCenter()}
        <BackToGameButton infos={data.infos} parameters={parameters} />
    {/snippet}

    {#snippet bottomRight()}
        <ResetAllButton onclick={resetAll} />
    {/snippet}
</SettingsShell>

