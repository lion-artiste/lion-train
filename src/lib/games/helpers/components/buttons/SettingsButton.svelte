<script lang="ts">
    import { goto } from '$app/navigation';
    import type { GAME_INFOS, GAME_PARAMETERS } from '../../types';
    import SquareButton from '$lib/games/helpers/components/buttons/SquareButton.svelte';
    import { Cog } from 'lucide-svelte';


    interface Props {
        infos: GAME_INFOS;
        parameters: GAME_PARAMETERS;
        class?: string;
    }

    let { infos, parameters, class: className = "" }: Props = $props();
    
    
    function goToSettings() {
        const params = new URLSearchParams();
        Object.entries(parameters).forEach(([url_id, parameter]) => {
            let value = parameter.value ?? parameter.default;
            params.append(url_id, value.toString());
        });
        goto(`/games/${infos.id}/settings/?` + params.toString());
    }
</script>

<SquareButton onclick={() => goToSettings()} class={className}>
    <Cog size=28/>
</SquareButton>