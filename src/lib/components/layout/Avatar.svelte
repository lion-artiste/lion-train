<script lang="ts">
    import { type ColorGrid as ColorGridType } from "./colorGrid/ColorGrid";
    import defaultAvatar from "$lib/assets/images/default_avatar.jpg";
    import ColorGrid from "./colorGrid/ColorGrid.svelte";


    interface Props {
        size?: number,
        user?: {pixel_avatar: string | null, image: string | null}
    }

    let { size = 40, user }: Props = $props();

    let colorGrid = $derived((user?.pixel_avatar) ? JSON.parse(user.pixel_avatar) as ColorGridType : null);
</script>

<div style:width={`${size}px`} style:height={`${size}px`} class="border-slate-200 border-2 rounded-md bg-white cursor-pointer overflow-hidden">
    {#if colorGrid}
    <ColorGrid {colorGrid}/>
    {:else}
    <img src={user?.image ?? defaultAvatar} alt="avatar" class="w-full"/>
    {/if}
</div>

