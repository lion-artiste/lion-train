<script lang="ts">
    import { createEventDispatcher } from "svelte";

    interface Props {
        value?: string;
        id?: any | null;
        letterLimit?: number;
        choices?: {[key: string]: string} | null;
    }

    let {
        value = "",
        id = null,
        letterLimit = 50,
        choices = null
    }: Props = $props();

    function truncateString(str: string, num: number) {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num) + '...'
    }

    let dispatch = createEventDispatcher();

    function clickText() {
        dispatch("click", {
            id,
            value
        })
    }
    let displayText = $derived((choices && value in choices) ? choices[value] : truncateString(value, letterLimit));
</script>

<button class="text-lg cursor-default" onclick={clickText}>{displayText}</button>