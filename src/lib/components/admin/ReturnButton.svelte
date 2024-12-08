<script lang="ts">

    import { ChevronLeft } from "lucide-svelte";
    interface Props {
        href?: string;
        display: string;
    }

    let { href = "", display }: Props = $props();

</script>

<a {href} class="btn variant-filled-primary mb-4">
    <span><ChevronLeft/></span>
    <span>{display}</span>
</a>