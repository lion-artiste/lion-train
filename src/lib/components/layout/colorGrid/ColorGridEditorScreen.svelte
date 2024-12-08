<script lang="ts">
    import { type ColorGrid, type COLORS, COLORTABLE, type TOOL } from "./ColorGrid";

    interface Props {
        colorGrid: ColorGrid;
        onchange?: (coords: {x: number, y: number}[], color: COLORS) => void;
        currentColor?: COLORS;
        tool?: TOOL;
    }

    let { colorGrid, onchange, currentColor = 0, tool = "pen" }: Props = $props();

    let draw: boolean = $state(false);

    function PotToolLoop(newColor: COLORS, oldColor: COLORS, casesToTest:{x: number, y: number}[], iteration: number, maxIterations: number = Math.ceil(colorGrid.length * Math.sqrt(2))) {
        if (iteration > maxIterations) return;
        if (casesToTest.length == 0) return;

        onchange?.(casesToTest, newColor);

        let newCasesToTest: {x: number, y: number}[] = [];
        for (const el of casesToTest) {

            let left = (el.y - 1 >= 0) ? colorGrid[el.x][el.y - 1] : null;
            let right = (el.y + 1 < colorGrid[el.x].length) ? colorGrid[el.x][el.y + 1] : null;
            let top = (el.x - 1 >= 0) ? colorGrid[el.x - 1][el.y] : null;
            let bottom = (el.x + 1 < colorGrid.length) ? colorGrid[el.x + 1][el.y] : null;

            if (right !== null && right == oldColor && !newCasesToTest.some((obj) => {return (obj.x == el.x && obj.y == el.y + 1) })) newCasesToTest.push({x: el.x, y: el.y + 1});
            if (left !== null && left == oldColor && !newCasesToTest.some((obj) => {return (obj.x == el.x && obj.y == el.y - 1) })) newCasesToTest.push({x: el.x, y: el.y - 1});
            if (top !== null && top == oldColor && !newCasesToTest.some((obj) => {return (obj.x == el.x - 1 && obj.y == el.y) })) newCasesToTest.push({x: el.x - 1, y: el.y});
            if (bottom !== null && bottom == oldColor && !newCasesToTest.some((obj) => {return (obj.x == el.x + 1 && obj.y == el.y) })) newCasesToTest.push({x: el.x + 1, y: el.y});

            /*for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let xT = el.x + i;
                    let yT = el.y + j;
                    if (xT >= 0 && yT >= 0 && xT < colorGrid.length && yT < colorGrid[xT].length && colorGrid[xT][yT] == oldColor && !newCasesToTest.some((obj) => {return (obj.x == xT && obj.y == yT) })) {
                        newCasesToTest.push({x: xT, y: yT})
                    }
                }
            }*/
        }
        setTimeout(() => {
            PotToolLoop(newColor, oldColor, newCasesToTest, iteration+1, maxIterations);
        }, 30);
    }

    function onCaseClick(x: number, y: number) {
        if (!draw) return;
        if (tool == "pen") onchange?.([{x, y}], currentColor);
        if (tool == "pot") {
            let newColor = currentColor;
            let oldColor = colorGrid[x][y];
            let casesToTest: {x: number, y: number}[] = [{x, y}];
            let maxIterations = Math.ceil(2 * colorGrid.length * Math.sqrt(2));
            PotToolLoop(newColor, oldColor, casesToTest, 1, maxIterations);
        }
    }
</script>

<!--Main window-->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div style:grid-template-columns={`repeat(${colorGrid[0].length},1fr)`} style:grid-template-rows={`repeat(${colorGrid.length},1fr)`} onmousedown={() => draw = true} onmouseup={() => draw = false} onmouseleave={() => draw = false} class="h-full w-full grid cursor-pointer grow touch-none select-none">
    {#each colorGrid as row, x}
        {#each row as col, y}
            <button type='button' aria-label="Editor pixel" onclick={(event) => { draw = true; onCaseClick(x, y); draw = false; }} onmouseenter={() => onCaseClick(x, y)} onmousedown={() => { draw = true; onCaseClick(x, y)}} ontouchmove={() => onCaseClick(x, y)} style:background-color={COLORTABLE[col]}></button>
        {/each}
    {/each}
</div>