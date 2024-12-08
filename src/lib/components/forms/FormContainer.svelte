<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();

</script>

<div class="w-full flex flex-col items-center justify-center">
    <div class="bg-slate-200 rounded p-3 w-11/12 max-w-[400px]">
        {@render children?.()}
    </div>
</div>