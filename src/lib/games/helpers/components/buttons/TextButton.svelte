<script lang="ts">
    import type { Snippet } from "svelte";
    import Button from "./Button.svelte";
    import { cn } from "$lib/utils";
    import GameFont2 from "../text/GameFont2.svelte";

    interface Props {
        children: Snippet;
        onclick?: () => void;
        class?: string
    }

    let { children, onclick = () => {}, class: className }: Props = $props();
</script>

<Button onclick={() => onclick()} class={cn("py-4 px-4 text-nowrap text-sm", className)}>
    <GameFont2>
        {@render children()}
    </GameFont2>
</Button>