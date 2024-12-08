<script lang="ts">
    import type { GAME_INFOS, PLAYLIST } from "$lib/games/helpers/types";
    import Game from "../big-boosty/Game.svelte";
    import WhatTheCutNode from "./WhatTheCutNode";
    import type baseParameters from "./parameters";


    interface Props {
        parameters: typeof baseParameters;
        infos: GAME_INFOS;
        playlist: PLAYLIST;
        loggedIn?: boolean;
    }

    let { parameters, infos, playlist, loggedIn = false }: Props = $props();
</script>

<Game {loggedIn} {playlist} {parameters} {infos} gameNodeClass={WhatTheCutNode} />