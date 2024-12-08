<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { CheckCircle2, XCircle } from 'lucide-svelte';

    interface Props {
        value?: boolean | null;
        id?: any | null;
    }

    let { value = null, id = null }: Props = $props();

    let status = value;

    let dispatch = createEventDispatcher();

    function clickHandle() {
        //status = !status;
        dispatch("change", {
            id,
            status
        })
    }
</script>
<div class="h-full w-full flex flex-row items-center justify-left">
    <button  onclick={clickHandle}>
        {#if status}
            <CheckCircle2 class="stroke-green-500"/>
        {:else}
            <XCircle class="stroke-red-500"/>
        {/if}
    </button>
</div>