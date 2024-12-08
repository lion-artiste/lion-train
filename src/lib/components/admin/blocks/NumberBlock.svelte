<script lang="ts">
    import { createEventDispatcher } from "svelte";

    interface Props {
        value?: number | null;
        id?: any | null;
    }

    let { value = null, id = null }: Props = $props();

    let dispatch = createEventDispatcher();

    function clickText() {
        dispatch("click", {
            id,
            value
        })
    }
</script>

<button class="text-lg cursor-default" onclick={clickText}>{value ?? "-"}</button>