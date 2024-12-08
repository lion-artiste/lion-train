<script lang="ts">
    import Avatar from "$lib/components/layout/Avatar.svelte";
    import GameFont2 from "$lib/games/helpers/components/text/GameFont2.svelte";
    import type { User } from "@prisma/client";

    interface Props {
        user?: User | null;
        id?: any | null;
    }

    let { user = null, id = null }: Props = $props();

    function clickUser() {
    }
</script>

<button class="cursor-default flex flex-row items-center justify-start gap-x-2" onclick={clickUser}>
    {#if !user}
        <div class="italic"><GameFont2 class="text-[10px]">Anonymous</GameFont2></div>
    {:else}
    <a href={`/profile/@${user.tag}`}>
        <Avatar {user} size={30}/>
    </a>
        <div class="justify-self-start"><GameFont2 class="text-[10px]">@{user.tag}</GameFont2></div>
    {/if}
</button>