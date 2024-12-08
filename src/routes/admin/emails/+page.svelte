<script lang="ts">
    import type { PageData } from './$types';
    import Preview from 'svelte-email-tailwind/preview/preview.svelte';

    let { data }: { data: PageData } = $props();
</script>

<Preview {data} email="contact@lion-artiste.fr" />