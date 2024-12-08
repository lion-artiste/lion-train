<script lang="ts">
    import type { GAME_INFOS } from "$lib/games/helpers/types";
    interface Props {
        infos: GAME_INFOS;
    }

    let { infos }: Props = $props();
</script>

<a href={`/games/${infos.id}`} class="group/card w-full max-w-[320px] bg-slate-200 rounded-lg p-2 flex flex-col gap-y-2 items-center hover:scale-[1.03] cursor-pointer select-none">
    <div style:background-color={`${infos.light_color}`} class="w-full h-full rounded-lg overflow-hidden grid grid-cols-1 grid-rows-1 items-center justify-items-center relative">
        <div style:color={`${infos.main_color}`} class="col-start-1 row-start-1 opacity-0 p-3 group-hover/card:opacity-100 max-w-11/12 text-center">{infos.description}</div>
        <img class="opacity-1 group-hover/card:opacity-0 w-full col-start-1 row-start-1" src={`/images/games/${infos.id}/illustration.svg`} alt={infos.name}/>
    </div>
    <div class="text-black font-sstv text-3xl">{infos.name}</div>
</a>