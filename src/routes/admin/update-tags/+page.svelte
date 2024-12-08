<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<div class="text-white">
    {#if data.success}
        Users successfully updated !
    {:else}
        {data.message}
    {/if}
</div>