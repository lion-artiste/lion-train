<script lang="ts">
    import FieldContainer from "./FieldContainer.svelte";
    import type { HTMLInputAttributes } from "svelte/elements";

    interface Props extends HTMLInputAttributes{
        title: string;
    }

    let {
        title,
        type = "text",
        ...rest
    }: Props = $props();
</script>

<FieldContainer>
    {#snippet title()}{title ?? ""}{#if rest.required} *{/if}{/snippet}
    {#snippet content()}<input class="bg-white text-black w-full rounded-md" {...rest}/>{/snippet}
</FieldContainer>