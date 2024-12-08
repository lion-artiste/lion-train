<script lang="ts">
    import "../../app.css";
    import Navigation from "$lib/components/layout/Navigation.svelte";
    import { page } from '$app/stores';
    import { Heart } from 'lucide-svelte';
    import type { LayoutData } from "./$types";
    import GameFont2 from "$lib/games/helpers/components/text/GameFont2.svelte";
    import GameFont from "$lib/games/helpers/components/text/GameFont.svelte";
    import type { Snippet } from "svelte";

    
    interface Props {
        data: LayoutData;
        children?: Snippet;
    }

    let { data, children }: Props = $props();
    let user = $derived(data.user);
</script>

<div style:background-color={$page.data.background ?? "#0261ce"} class="bg-main flex flex-col items-center text-white min-h-screen h-full w-full relative">

    <Navigation {user}>
        {#snippet links()}
            {#if user?.admin}<a href="/admin">Admin</a>{/if}
        {/snippet}
    </Navigation>

    <!-- Page Tunnel -->
    <div class="w-11/12 max-w-[1400px] grid grid-rows-[5fr_min-content_4fr] justify-items-stretch grow">
    
        <!-- Page top -->
        <header class="flex flex-col justify-center align-center gap-y-1 pb-10 pt-4">
            {#if $page.data.title}<div class="text-center"><GameFont class="text-5xl">{$page.data.title}</GameFont></div>{/if}
            {#if $page.data.description}<div class="text-center"><GameFont2 class="text-[12px]">{$page.data.description}</GameFont2></div>{/if}
        </header>
    
        <main>
            {@render children?.()}
        </main>
    
        <footer class="flex flex-col justify-end justify-self-center pb-5">
            <div class="flex flex-col items-center justify-center gap-0">
                <div class="flex flex-row items-center gap-1">
                    <div><GameFont2 class="text-[10px]">Coded with</GameFont2></div>
                    <Heart strokeWidth=0 fill="red" size=20/>
                    <div><GameFont2 class="text-[10px]">by <a href="https://www.instagram.com/lion.artiste/" target="_blank" class="link">Lion</a></GameFont2></div>
                </div>
                <div class="flex flex-row items-stretch gap-1 text-xs">
                    <a class="opacity-70 hover:underline hover:opacity-100" href="/contact" target="_blank">Contact</a>
                    <div>&#183;</div>
                    <a class="opacity-70 hover:underline hover:opacity-100" href="https://buymeacoffee.com/lionmusico3" target="_blank">Buy me a coffee</a>
                </div>
            </div>
        </footer>
    </div>
</div>