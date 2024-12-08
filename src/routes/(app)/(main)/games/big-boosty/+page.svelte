<script lang="ts">
    import type { PageData } from './$types';
    import Game from './Game.svelte';
    
    interface Props {
        data: PageData;
    }
    let { data }: Props = $props();
</script>

<Game sfxVolume={(data.user?.sfx_volume ?? 2) as 0 | 1 | 2 | 3} loggedIn={Boolean(data.user)} playlist={data.playlist} parameters={data.parameters} infos={data.infos}/>