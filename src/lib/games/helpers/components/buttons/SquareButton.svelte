<script lang="ts">
    import type { Snippet } from "svelte";
    import Button from "./Button.svelte";

    interface Props {
        class?: string;
        children?: Snippet;
        onclick?: () => void;
    }

    let { class: className, children, onclick = () => {} }: Props = $props();
    
</script>

<Button onclick={() => onclick()} class={className}>
    <div class="w-9 h-9 grid grid-cols-1 grid-rows-1 items-center justify-items-center [&>*]:col-start-1 [&>*]:col-end-1">
        {@render children?.()}
    </div>
</Button>