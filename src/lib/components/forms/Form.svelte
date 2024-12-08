<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Snippet } from "svelte";
    import type { HTMLFormAttributes } from "svelte/elements";

    interface Props extends HTMLFormAttributes {
        submitBtn?: boolean;
        error?: string | null;
        children?: Snippet;
        bottomLinks?: Snippet;
        submitButton?: Snippet<[string]>,
        submitButtonText?: string
    }

    let {
        method = "POST",
        submitBtn = true,
        error = null,
        children,
        bottomLinks,
        submitButton,
        submitButtonText = "Let's go !",
        ...rest
    }: Props = $props();
</script>

<form {method} {...rest} class="flex flex-col gap-2" use:enhance>

    {#if error}
        <div class="text-red-500">{error}</div>
    {/if}

    {@render children?.()}

    {#if submitButton}
        {@render submitButton(submitButtonText) }
    {:else}
        <input type="submit" class="btn cursor-pointer bg-blue-800 text-white rounded-lg" value={submitButtonText}/>
    {/if}

    <div class="text-sm underline text-slate-400 text-center flex flex-col items-center justify-center gap-1">
        {@render bottomLinks?.()}
    </div>

</form>