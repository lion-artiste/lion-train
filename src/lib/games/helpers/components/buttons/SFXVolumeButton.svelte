<script lang="ts">
    import SquareButton from '$lib/games/helpers/components/buttons/SquareButton.svelte';
    import { Volume, Volume1, Volume2, VolumeX } from 'lucide-svelte';

    interface Props {
        sfxVolume?: 0 | 1 | 2 | 3;
        class?: string;
        loggedIn?: boolean;
        onclick?: (sfxVolume: 0 | 1 | 2 | 3) => void
    }

    let { sfxVolume = $bindable(2), class: className = "", loggedIn = false, onclick = (sfxVolume) => {} }: Props = $props();

    function saveSFXVolume(volume: 0 | 1 | 2 | 3) {
        if (!loggedIn) return;
        fetch("/api/public/users/volume", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sfx_volume: volume })
        }).then((response) => response.json()).then((data) => {
            //if (data in [0,1,2,3]) user.set({...$user, game_sfx_volume: data.data.game_sfx_volume} as USER);
            //if (user) user.sfxVolume = data;
        });
    }

    function click() {
        sfxVolume = ((((sfxVolume - 1) % 4) + 4) % 4) as 0 | 1 | 2 | 3;
        saveSFXVolume(sfxVolume);
        onclick(sfxVolume);
    }
</script>

<SquareButton onclick={() => click()} class={className}>
    {#if sfxVolume == 3}
    <Volume2 size=28/>
    {:else if sfxVolume == 2}
    <Volume1 size=28/>
    {:else if sfxVolume == 1}
    <Volume size=28/>
    {:else}
    <VolumeX size=28/>
    {/if}
</SquareButton>