<script lang="ts">
    import { createEventDispatcher } from "svelte";

    interface Props {
        value?: any | null;
    }

    let { value = null }: Props = $props();

    let dispatch = createEventDispatcher();

    function clickHandle() {
        dispatch("click", { value });
    }
</script>
<!--Id Block-->
<button class="text-lg" onclick={clickHandle}>
    {value}
</button>