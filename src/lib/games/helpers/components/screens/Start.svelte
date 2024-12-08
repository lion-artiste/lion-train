<script lang="ts">
    import BlinkingText from "../text/BlinkingText.svelte";
    import GameFont from "../text/GameFont.svelte";

    interface Props {
        onstart: () => void;
    }

    let { onstart = () => {}}: Props = $props();

</script>

<div>
    <GameFont>
        <BlinkingText>
            <button class="cursor-pointer" onclick={() => onstart()}>Start game</button>
        </BlinkingText>
    </GameFont>
</div>
<div class="text-xl mt-4 mx-2 text-center flex flex-row items-baseline gap-2">
    <GameFont class="inline text-xl">Or click on the "?" button to read a tutorial</GameFont>
</div>