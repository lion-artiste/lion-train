<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";


    interface Props {
        children: Snippet;
        onclick?: () => void;
        class?: string
    }

    let { children, onclick = () => {}, class: className }: Props = $props();
</script>

<button onclick={() => onclick()} class="group flex flex-col items-stretch justify-center">
    <!--<div>{text}</div>-->
    <div class="bg-transparent h-[2px] hidden group-hover:block"></div>
    <div class={cn("bg-slate-500 relative rounded border-b-[2px] border-b-slate-600 group-hover:border-b-0 text-white", className)}>
        {@render children()}
    </div>
</button>