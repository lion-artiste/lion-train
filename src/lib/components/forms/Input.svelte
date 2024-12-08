<script lang="ts">

    import type { HTMLInputAttributes } from 'svelte/elements'

    interface Props extends HTMLInputAttributes {
        error?: string | null;
        oninput?: (value: any) => void | null;
        onchange?: (value: any) => void | null;
    }

    let {
        value = $bindable(null),
        type = "text",
        error = null,
        oninput = () => {},
        onchange = () => {},
        ...other
    }: Props = $props();

    let baseClasses = $derived("input rounded-lg p-2 w-full bg-white text-black" + ((error !== null) ? " border-red-500 text-red-500 placeholder:text-red-500" : ""));
</script>

<div class="form-control w-full">

    <!-- Input -->
    <input bind:value {type} class={baseClasses} {...other} oninput={() => oninput(value)} onchange={() => onchange(value)}/>

    {#if error}
    <div class="label">
        <span class="label-text-alt text-red-500">{error}</span>
    </div>
    {/if}
</div>
