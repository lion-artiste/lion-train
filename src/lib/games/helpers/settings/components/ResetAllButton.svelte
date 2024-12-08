<script lang="ts">
    import { RotateCcw } from "lucide-svelte";
    import SquareButton from "../../components/buttons/SquareButton.svelte";

    interface Props {
        onclick?: () => void;
    }

    let { onclick = () => {} }: Props = $props();
</script>

<SquareButton onclick={() => onclick()}>
    <RotateCcw size={24}/>
</SquareButton>