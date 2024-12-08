<script lang="ts">
    import type { PageData } from './$types';
    import Game from './Game.svelte';
    
    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
</script>

<Game loggedIn={Boolean(data.user)} playlist={data.playlist} parameters={data.parameters} infos={data.infos}/>