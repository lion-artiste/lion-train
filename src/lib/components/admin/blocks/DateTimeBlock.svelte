<script lang="ts">
    import { createEventDispatcher } from "svelte";

    interface Props {
        value: string | Date | null;
        id?: any | null;
        options?: {[key: string]: string};
    }

    let { value, id = null, options = {month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"} }: Props = $props();

    let date = $derived((value) ? (typeof value == "string") ? new Date(value) : value : null);

    let displayDate = $derived((date) ? date.toLocaleString('en-US', options) : "");

    let dispatch = createEventDispatcher();

    function clickText() {
        dispatch("click", {
            id,
            value
        })
    }
</script>

<button class="cursor-default" onclick={clickText}>{displayDate}</button>