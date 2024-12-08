<script lang="ts">
    import { type ColorGrid, type COLORS, COLORTABLE, type TOOL } from "./ColorGrid";

    interface Props {
        colorGrid: ColorGrid;
        onchange?: (x: number, y: number, color: COLORS) => void;
        currentColor?: COLORS;
        tool?: TOOL;
    }

    let { colorGrid, onchange, currentColor = 0, tool = "pen" }: Props = $props();

    let draw: boolean = $state(false);

    function PotToolLoop(newColor: COLORS, oldColor: COLORS, casesToTest:{x: number, y: number}[], iteration: number) {
        console.log(iteration)
        console.log(casesToTest);
        if (iteration > Math.ceil(colorGrid.length * Math.sqrt(2))) return;
        if (casesToTest.length == 0) return;
        for (const el of casesToTest) {
            onchange?.(el.x, el.y, newColor);
        }
        let newCasesToTest: {x: number, y: number}[] = [];
        for (const el of casesToTest) {
            for (let xT = el.x - 1; xT <= el.x + 1; xT++) {
                for (let yT = el.y - 1; yT <= el.y + 1; yT++) {
                    if (xT >= 0 && yT >= 0 && xT < colorGrid.length && yT < colorGrid[xT].length && colorGrid[xT][yT] == oldColor && !newCasesToTest.some((obj) => {return (obj.x == xT && obj.y == yT) })) {
                        newCasesToTest.push({x: xT, y: yT})
                    }
                }
            }
        }
        setTimeout(() => {
            PotToolLoop(newColor, oldColor, newCasesToTest, iteration+1);
        }, 30);
    }

    function onCaseClick(x: number, y: number) {
        if (!draw) return;
        if (tool == "pen") onchange?.(x, y, currentColor);
        if (tool == "pot") {
            let newColor = currentColor;
            let oldColor = colorGrid[x][y];
            let casesToTest: {x: number, y: number}[] = [{x, y}];
            PotToolLoop(newColor, oldColor, casesToTest, 1);
        }
    }
</script>

        <!--Main window-->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
<div style:grid-template-columns={`repeat(${colorGrid[0].length},1fr)`} style:grid-template-rows={`repeat(${colorGrid.length},1fr)`} onmousedown={() => draw = true} onmouseup={() => draw = false} onmouseleave={() => draw = false} class="h-full w-full grid cursor-pointer grow touch-none select-none">
    {#each colorGrid as row, x}
        {#each row as col, y}
            <button type='button' aria-label="Editor pixel" onclick={(event) => { draw = true; onCaseClick(x, y); draw = false; }} onmouseenter={() => onCaseClick(x, y)} onmousedown={() => onCaseClick(x, y)} ontouchmove={() => onCaseClick(x, y)} style:background-color={COLORTABLE[col]}></button>
        {/each}
    {/each}
</div>