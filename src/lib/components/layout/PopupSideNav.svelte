<script lang="ts">
    import { cn } from "$lib/utils";
    import { Menu, X } from "lucide-svelte";
    import type { Snippet } from "svelte";
    import { slide } from "svelte/transition";

    interface Props {
        position?: "left" | "right";
        openButton?: Snippet;
        closeButton?: Snippet;
        class?: string;
        children?: Snippet;
    }

    let { position = "right", openButton, closeButton, class: className, children }: Props = $props();

    let open = $state(false);
</script>

<button onclick={() => open = true}>
    {#if openButton}
        {@render openButton()}
    {:else}
    <div class="text-white p-4 cursor-pointer">
        <Menu size={25}/>
    </div>
    {/if}
</button>

{#if open}
<div class={cn("fixed top-0 left-0 h-full w-full flex items-stretch z-50", position == "right" ? "flex-row" : "flex-row-reverse")}>
    <button type="button" aria-label="Close nav" class="grow bg-black/50" onclick={() => {open = false}}></button>
    <div class={cn("w-11/12 max-w-[300px] bg-blue-900 text-white p-4 flex flex-col items-stretch", className)} in:slide={{axis: "x"}}>
        <div class={cn("flex flex-row items-center")}>
            <button onclick={() => {open = false}}>
                {#if closeButton}
                    {@render closeButton?.()}
                {:else}
                    <div class="p-4">
                        <X size={25}/>
                    </div>
                {/if}
            </button>
        </div>
        <button class="grow" onclick={() => {open = false}}>
            {@render children?.()}
        </button>
    </div>
</div>
{/if}