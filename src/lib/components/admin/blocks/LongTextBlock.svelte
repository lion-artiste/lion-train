<script lang="ts">
    import { createEventDispatcher } from "svelte";

    interface Props {
        value?: string;
        id?: any | null;
        lineLimit?: number;
    }

    let { value = "", id = null, lineLimit = 50 }: Props = $props();
    
    function insertNewLines(inputString: string, number: number) {
        let result = '';
        for (let i = 0; i < inputString.length; i += number) {
            result += inputString.slice(i, i + number) + '<br>';
        }
        return result;
    }
    
    let displayText = $derived(insertNewLines(value, lineLimit));

    let dispatch = createEventDispatcher();

    function clickText() {
        dispatch("click", {
            id,
            value
        })
    }
</script>

<button class="text-left" onclick={clickText}>{@html displayText}</button>