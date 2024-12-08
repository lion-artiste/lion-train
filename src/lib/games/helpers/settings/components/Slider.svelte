<script lang="ts">

    import type { FLOAT_PARAMETER, INTEGER_PARAMETER } from "$lib/games/helpers/types";
    import { RotateCcw } from 'lucide-svelte';
    import GameFont from "../../components/text/GameFont.svelte";
    import SquareButton from "../../components/buttons/SquareButton.svelte";
    import Slider from "../../components/Slider.svelte";

    
    
    interface Props {
        url_id: string;
        parameter: INTEGER_PARAMETER | FLOAT_PARAMETER;
        min?: number | null;
        max?: number | null;
        type?: string | null;
        title?: string | null;
        unit?: string | null;
        onchange?: (id: string, value: number) => void;
        onreset?: (id: string) => void;
    }
    
    let {
        url_id,
        parameter,
        min = null,
        max = null,
        type = null,
        title = null,
        unit = null,
        onchange = () => {},
        onreset = () => {}
    }: Props = $props();
    
    let value: number = $derived(parameter.value ?? parameter.default);
</script>

<div class="flex flex-col items-center gap-y-1 max-w-full">
    <!-- Top row -->
    <div class="flex flex-row items-center w-full">
        <div class="w-[50px]"></div>
        <div class="grow">
            <GameFont class="text-center">{title ?? parameter.name} : {value}{unit ?? parameter.unit}</GameFont>
        </div>
        <div class="w-[50px]">
            <SquareButton onclick={() => onreset(url_id)}>
                <RotateCcw size={24}/>
            </SquareButton>
        </div>
    </div>

    <!--Slider-->
    <div class="self-stretch">
        <!--{#if type == "integer" || parameter.type == "integer"}
        <input type="range" min={min ?? parameter.min} max={max ?? parameter.max} value={value} oninput={sliderInput} class="range cursor-pointer w-full" />
        {:else if type == "float" || parameter.type == "float"}
        <input type="range" min={min ?? parameter.min} max={max ?? parameter.max} step="0.1" value={value} oninput={sliderInput} class="range cursor-pointer w-full" />
        {/if}-->
        <Slider min={min ?? parameter.min} max={max ?? parameter.max} value={value} step={(type == "float" || parameter.type == "float") ? 0.1 : 1} onchange={(newValue) => onchange(url_id, newValue)}></Slider>
    </div>
</div>