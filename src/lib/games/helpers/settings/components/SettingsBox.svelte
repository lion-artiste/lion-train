<script lang="ts">
    import type { GAME_INFOS, GAME_PARAMETERS } from "$lib/games/helpers/types";
    import type { Snippet } from "svelte";
    import BackToGameButton from "./BackToGameButton.svelte";
    import ResetAllButton from "./ResetAllButton.svelte";
    import SettingsShell from "./SettingsShell.svelte";

    interface Props {
        infos: GAME_INFOS,
        parameters: GAME_PARAMETERS,
        sliders?: Snippet<[GAME_INFOS, GAME_PARAMETERS, (id: string, value: number) => void, (id: string) => void]>
    }

    let { infos, parameters, sliders: parentSliders }: Props = $props();

    let Parameters = $state(structuredClone(parameters));

    function resetAll() {
        Object.keys(Parameters).forEach( function (id) {
            Parameters[id as keyof typeof Parameters].value = Parameters[id as keyof typeof Parameters].default
        });
    }

    function onchange(id: string, value: number) {
        if (id in Parameters) {
            Parameters[id as keyof typeof Parameters].value = value;
        }
    }

    function onreset(id: string) {
        if (id in Parameters) {
            Parameters[id as keyof typeof Parameters].value = Parameters[id as keyof typeof Parameters].default
        }
    }
</script>

<SettingsShell>
    {#snippet sliders()}
        {@render parentSliders?.(infos, Parameters, onchange, onreset)}
    {/snippet}

    {#snippet bottomCenter()}
        <BackToGameButton {infos} parameters={Parameters} />
    {/snippet}

    {#snippet bottomRight()}
        <ResetAllButton onclick={resetAll} />
    {/snippet}
</SettingsShell>