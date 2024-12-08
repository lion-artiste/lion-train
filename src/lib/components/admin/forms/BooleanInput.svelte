<script lang="ts">
    import FieldContainer from "./FieldContainer.svelte";
    import type { HTMLInputAttributes } from "svelte/elements";

    interface Props extends HTMLInputAttributes {
        title: string;
        checked?: boolean;
        textChecked?: string;
        textUnchecked?: string;
    }

    let {
        title,
        checked = $bindable(false),
        textChecked = "Yes",
        textUnchecked = "No",
        ...rest
    }: Props = $props();
</script>

<FieldContainer>
    {#snippet title()}{title ?? ""}{#if rest.required} *{/if}{/snippet}
    {#snippet content()}
        <input type="checkbox" {...rest} bind:checked={checked} class="hidden"/>
        <button type="button" onclick={() => checked = !checked} class:bg-green-600={checked} class:bg-red-500={!checked} class="flex flex-row items-center justify-center p-2 w-full rounded-md">
            {#if checked}
                {textChecked}
            {:else}
                {textUnchecked}
            {/if}
        </button>
    {/snippet}
</FieldContainer>