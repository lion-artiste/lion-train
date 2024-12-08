<script lang="ts">
    import SquareButton from "$lib/games/helpers/components/buttons/SquareButton.svelte";
    import TextButton from "$lib/games/helpers/components/buttons/TextButton.svelte";
    import GameFont from "$lib/games/helpers/components/text/GameFont.svelte";
    import { ChevronLeft, PaintBucket, PenTool, RotateCcw } from "lucide-svelte";
    import { type ColorGrid, type COLORS, COLORTABLE, DEFAULTGRIDS, type TOOL } from "./ColorGrid";
    import ColorGridEditorScreen from "./ColorGridEditorScreen.svelte";
    import { cn } from "$lib/utils";
    import GameFont2 from "$lib/games/helpers/components/text/GameFont2.svelte";

    interface Props {
        colorGrid: ColorGrid;
        size?: number;
        onchange?: (coords: {x: number, y: number}[], color: COLORS) => void;
        onsave?: () => void;
        onreset?: () => void;
    }

    let { colorGrid, onchange, onsave, onreset, size = 500 }: Props = $props();

    let currentColor: COLORS = $state(0);

    let tool:TOOL = $state("pen");

</script>

<div class="flex flex-col items-stretch gap-4 bg-slate-200 p-4 rounded-md">
    <div class="flex flex-row items-stretch justify-stretch gap-4">

        <div style:width={`${size}px`} style:height={`${size}px`}>
                <ColorGridEditorScreen {currentColor} {colorGrid} {onchange} {tool}/>
        </div>

        <div class="flex flex-col items-stretch grow gap-8">

            <div class="flex flex-col items-stretch gap-4">
                <div class="text-black"><GameFont2>Pick a color and a tool :</GameFont2></div>
                <div class="grid grid-cols-9 grid-rows-2 h-[60px] gap-2">
                    <div style:background-color={COLORTABLE[currentColor]} class="col-start-1 col-end-2 row-start-1 row-end-3"></div>
                    {#each COLORTABLE as color, i}
                    <button aria-label="ColorGrid Color selector" onclick={() => currentColor = (i as COLORS)} style:background-color={color}></button>
                    {/each}
                </div>
                <div class="flex flex-row items-center gap-2">
                    <SquareButton onclick={() => {tool = "pen"}} class={cn(tool == "pen" ? "bg-blue-500" : "")}>
                        <PenTool/>
                    </SquareButton>
                    <SquareButton onclick={() => {tool = "pot"}} class={cn(tool == "pot" ? "bg-blue-500" : "")}>
                        <PaintBucket/>
                    </SquareButton>
                </div>
            </div>

            <div class="flex flex-col items-stretch gap-4">
                <div class="text-black"><GameFont2>Or start from a default canvas :</GameFont2></div>
                <div class="flex flex-row items-center gap-4">
                    {#each DEFAULTGRIDS as el}
                    <TextButton class="py-2 px-3" onclick={() => { 
                        let grid = el.grid();
                        for (let x = 0; x < grid.length; x++) {
                            let row = grid[x];
                            for (let y = 0; y < row.length; y++) {
                                onchange?.([{x, y}], row[y])
                            }
                        }
                    }}><GameFont>{el.name}</GameFont></TextButton>
                    {/each}
                </div>
            </div>

            <!--<div>
                <div class="text-black"><GameFont2>Changes are saved only when you hit the "Save" button, have fun !</GameFont2></div>
            </div>-->
        </div>


    </div>
    <div class="grid grid-cols-[1fr_min-content_1fr] grid-rows-1 items-center gap-4">
        <div class="justify-self-end">
            <a href="/profile">
                <SquareButton>
                    <ChevronLeft size={32} class="relative -left-[2px]"/>
                </SquareButton>
            </a>
        </div>
        <TextButton class="py-2 px-3" onclick={() => onsave?.()}><GameFont>Save</GameFont></TextButton>
        <div>
            <SquareButton onclick={() => onreset?.()} >
                <RotateCcw size=28/>
            </SquareButton>
        </div>
    </div>
</div>