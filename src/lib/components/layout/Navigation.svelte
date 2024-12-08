<script lang="ts">
    import logo from "$lib/assets/images/meta/logo_blanc.svg";
    import type { Snippet } from "svelte";
    import Avatar from "./Avatar.svelte";
    import { cn } from "$lib/utils";
    import PopupSideNav from "./PopupSideNav.svelte";

    let showUserMenu = $state(false);

    interface Props {
        user?: {admin: boolean, pixel_avatar: string | null, image: string | null, tag: string | null } | null
        class?: string;
        links?: Snippet;
        leftBox?: Snippet
    }

    let {
        user,
        class: className,
        links,
        leftBox,
        ...rest
    }: Props = $props();
    
    </script>

{#snippet logoutLink()}
    <a href="/logout" data-sveltekit-reload data-sveltekit-preload-data="tap">Logout</a>
{/snippet}

<div class={cn("w-full py-2 px-4 bg-transparent flex flex-row flex-nowrap items-center justify-between", className)} {...rest}>

    <!-- Logo -->
    <div class="flex flex-row items-center gap-6">
            <div> 
                <a class="bg-transparent cursor-pointer" href="/">
                    <img src={logo} alt="Logo" class="h-[50px]"/>
                </a>
            </div>

            {#if leftBox}
            <div class="flex flex-row items-center">
                {@render leftBox()}
            </div>
            {/if}
    </div>

    <div class="flex flex-row items-center gap-6">
    
            <!-- Main links -->
            <div class="flex flex-row items-center gap-6 font-gaming text-xs">

                <div class="max-sm:hidden">
                    {@render links?.()}
                </div>

                {#if user}

                <!--Big screens-->
                <div class="max-sm:hidden flex flex-row items-center gap-6">
                    {@render logoutLink()}
                    <div class="relative flex flex-row items-center">
                        <!-- Profile picture -->
                        <button type="button" onclick={() => showUserMenu = !showUserMenu}>
                            <a href={`/profile/@${user?.tag}`}>
                                <Avatar {user}/>
                            </a>
                        </button>
                    </div>
                </div>

                <!--Tiny screens-->
                <div class="sm:hidden">
                    <PopupSideNav>
                        {#snippet openButton()}
                        <Avatar {user}/>
                        {/snippet}

                        <div class="flex flex-col items-stretch gap-6 py-6 font-sstv text-3xl">
                            <a href={`/profile/@${user?.tag}`}>Profile</a>
                            {@render links?.()}
                            {@render logoutLink()}
                        </div>
                    </PopupSideNav>
                </div>

                {:else}
                    <a href="/login">Login</a>
                {/if}
            </div>
        
        
            <!-- If not user -->
        
    </div>

</div>
