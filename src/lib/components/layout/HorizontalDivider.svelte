<script lang="ts">
    interface Props {
        text?: string | null;
        padding?: string;
    }

    let { text = null, padding = "py-4" }: Props = $props();
</script>

<div class="relative flex items-center {padding}">
    <div class="flex-grow border-t border-gray-400"></div>
    {#if text}
    <span class="flex-shrink mx-4 text-gray-400">{text}</span>
    <div class="flex-grow border-t border-gray-400"></div>
    {/if}
</div>

