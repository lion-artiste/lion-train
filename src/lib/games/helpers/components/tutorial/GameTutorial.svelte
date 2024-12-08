<script lang="ts">
    import type { Snippet } from "svelte";
    import Button from "../buttons/Button.svelte";
    import GameFont from "../text/GameFont.svelte";

    interface Props {
        show: boolean;
        onclose?: () => void;
        children: Snippet
    }

    let { show = false, onclose, children }: Props = $props();
</script>

<!--Tutorial-->
{#if show}
<div class="group/tutorial fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex flex-col items-center justify-center">
    <button type="button" class="w-11/12 max-w-[500px] h-screen max-h-[600px] bg-slate-200 rounded-lg p-3 relative flex flex-col items-stretch gap-3 cursor-default">
        <div class="bg-white p-3 grow rounded-md overflow-y-scroll text-black text-left">
            {@render children?.()}
        </div>
        <div class="flex flex-row items-center justify-center">
            <Button onclick={() => onclose?.()}>
                <div class="py-2 px-4 text-nowrap">
                    <GameFont fontSize="text-xl">Let's go !</GameFont>
                </div>
            </Button>
        </div>
    </button>
</div>
{/if}