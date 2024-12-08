<script lang="ts">
    import { createEventDispatcher } from "svelte";

    interface Props {
        value?: string;
        id?: any | null;
    }

    let { value = $bindable(""), id = null }: Props = $props();

    let edit = $state(false);

    let dispatch = createEventDispatcher();

    function focusInput(node: HTMLInputElement) {
        node.focus();
    }

    function inputBlur() {
        dispatch("change", {
            id,
            value
        })
        edit = false;
    }
</script>

{#if edit}
    <input class:hidden={!edit} use:focusInput type="text" class="text-lg w-fit" bind:value={value} onchange={inputBlur} onblur={inputBlur}/>
{:else}
    <button class:hidden={edit} class="text-lg" onclick={() => {edit = true;}}>{value}</button>
{/if}