<script lang="ts">
    import FieldContainer from "./FieldContainer.svelte";
    import type { HTMLTextareaAttributes } from "svelte/elements";

    interface Props extends HTMLTextareaAttributes{
        title: string;
    }

    let {
        title,
        ...rest
    }: Props = $props();
</script>

<FieldContainer>
    {#snippet title()}{title ?? ""}{#if rest.required} *{/if}{/snippet}
    {#snippet content()}
    <textarea class="bg-white text-black w-full rounded-md" {...rest}>
    </textarea>{/snippet}
</FieldContainer>