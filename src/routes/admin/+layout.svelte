<script lang="ts">
    import "../../app.css";
    import { page } from '$app/stores';
    import Navigation from '$lib/components/layout/Navigation.svelte';
    import { Cog, Headphones, Home, Mail, Radio, Rss, ScrollText, Target, User } from 'lucide-svelte';

    import { AppShell } from '@skeletonlabs/skeleton';
    import type { LayoutData } from "./$types";
    import type { Snippet } from "svelte";
    import PopupSideNav from "$lib/components/layout/PopupSideNav.svelte";

    interface Props {
        data: LayoutData;
        children?: Snippet;
    }

    let { data, children }: Props = $props();
</script>

{#snippet adminNav()}
<nav class="flex flex-col items-start gap-2">

    <a href="/admin">
        <span class="badge bg-primary-500"><Home size="16"/></span>
        <span class="flex-auto">Home</span>
    </a>

    <h1 class="my-2">Games</h1>
    <ul class="ml-4 flex flex-col items-start gap-2">
        <li>
            <a href="/admin/scores">
                <span class="badge bg-primary-500"><Target size="16"/></span>
                <span class="flex-auto">Scores</span>
            </a>
        </li>
        <li>
            <a href="/admin/sources">
                <span class="badge bg-primary-500"><Headphones size="16"/></span>
                <span class="flex-auto">Sources</span>
            </a>
        </li>
        <li>
            <a href="/admin/playlists">
                <span class="badge bg-primary-500"><ScrollText size="16"/></span>
                <span class="flex-auto">Playlists</span>
            </a>
        </li>
    </ul>

    <h1 class="my-2">Users</h1>

    <ul class="ml-4 flex flex-col items-start gap-2">
        <li>
            <a href="/admin/users">
                <span class="badge bg-primary-500"><User size="16"/></span>
                <span class="flex-auto">Users</span>
            </a>
        </li>
    </ul>

    <h1 class="my-2">Misc</h1>

    <ul class="ml-4 flex flex-col items-start gap-2">
        <li>
            <a href="/admin/news">
                <span class="badge bg-primary-500"><Rss size="16"/></span>
                <span class="flex-auto">News</span>
            </a>
        </li>
        <li>
            <a href="/admin/logs">
                <span class="badge bg-primary-500"><Cog size="16"/></span>
                <span class="flex-auto">Logs</span>
            </a>
        </li>
        <li>
            <a href="/admin/signals">
                <span class="badge bg-primary-500"><Radio size="16"/></span>
                <span class="flex-auto">Signals</span>
            </a>
        </li>
        <li>
            <a href="/admin/emails" target="_blank">
                <span class="badge bg-primary-500"><Mail size="16"/></span>
                <span class="flex-auto">Emails</span>
            </a>
        </li>
    </ul>
</nav>
{/snippet}

<div style:background-color={($page.data.background) ? `rgb(${$page.data.background})` : "#0261ce"} class="min-h-screen h-full w-full relative flex flex-col items-stretch">

	<div>
        <Navigation user={data.user} class="bg-blue-950 text-white">
            {#snippet links()}{/snippet}
            {#snippet leftBox()}
            <div class="xl:hidden flex flex-row items-center">
                <PopupSideNav position="left">
                    {@render adminNav()}
                </PopupSideNav>
            </div>
            {/snippet}
        </Navigation>
    </div>
            

	<div class="grow flex flex-row items-stretch">
            
        <div class="max-xl:hidden w-80 bg-blue-900 text-white p-4 ">
            {@render adminNav()}
        </div>
        
        <div class="p-4 grow">
            {@render children?.()}
        </div>
    </div>


</div>