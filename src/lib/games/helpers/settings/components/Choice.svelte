<script lang="ts">

    import { RotateCcw } from "lucide-svelte";
    import type { CHOICE_PARAMETER } from "../../types";
    import GameFont from "../../components/text/GameFont.svelte";
    import SquareButton from "../../components/buttons/SquareButton.svelte";
    import TextButton from "../../components/buttons/TextButton.svelte";

    interface Props {
        url_id: string;
        parameter: CHOICE_PARAMETER<string>;
        title?: string | null;
        onchange?: (id: string, value: string) => void;
        onreset?: (id: string) => void;
    }

    let { url_id, parameter, title = null, onchange, onreset }: Props = $props();

    let value = $derived(parameter.value ?? parameter.default);

    function changeValue(newValue: string) {
        onchange?.(url_id, newValue)
    }

</script>

<div class="flex flex-col items-center gap-y-2">
    <!-- Top row -->
    <div class="flex flex-row items-center w-full">
        <div class="w-[50px]"></div>
        <div class="grow">
            <GameFont class="text-center">{title ?? parameter.name}</GameFont>
        </div>
        <div class="w-[50px]">
            <SquareButton onclick={() => onreset?.(url_id)}>
                <RotateCcw size={24}/>
            </SquareButton>
        </div>
    </div>

    <div class="self-stretch flex flex-row items-center gap-3 justify-center flex-wrap">
        {#each parameter.choices as choice}
        <div class:opacity-50={(value != choice.value)}>
            <TextButton onclick={() => changeValue(choice.value)}>
                <GameFont>{choice.display}</GameFont>
            </TextButton>
        </div>
        {/each}
    </div>
</div>