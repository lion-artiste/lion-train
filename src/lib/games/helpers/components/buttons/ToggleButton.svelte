<script lang="ts">
    import type { Snippet } from "svelte";
    import StateIndicator from "../StateIndicator.svelte";
    import TextButton from "./TextButton.svelte";
    import GameFont2 from "../text/GameFont2.svelte";

    interface Props {
        name_on: string;
        name_off: string;
        state?: boolean;
        onclick?: (state: boolean) => void;
        display?: Snippet<[boolean, string, string]>
    }

    let { name_on, name_off, state = $bindable(false), onclick = () => {}, display }: Props = $props();

</script>

<TextButton onclick={() => { state = !state; onclick(state)}}>
    {#if display}
        {@render display(state, name_on, name_off)}
    {:else}
    <div class="min-w-[100px]">
        <div><GameFont2 class="text-sm">{state ? name_on : name_off}</GameFont2></div>
    </div>
    {/if}
    <StateIndicator {state}/>
</TextButton>