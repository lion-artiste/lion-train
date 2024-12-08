<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        thumb?: Snippet;
        track?: Snippet;
        value: number;
        min: number;
        max: number;
        step?: number;
        onchange?: (value: number) => void
    }

    let {
        thumb, track, value, min, max, step = 1, onchange
    }: Props = $props();

    let move: boolean = $state(false);

    let container : HTMLElement | undefined = $state(undefined);
    let containerWidth: number | undefined = $state(undefined);
    let containerLeft: number | undefined = $state(undefined);
    let thumbWidth: number | null = $state(null);

    function getDimensions() {
        containerLeft = container?.getBoundingClientRect().left;
    }

    function countDecimals(x: number) {
        if(Math.floor(x) === x) return 0;
        return x.toString().split(".")[1].length || 0;
    }

    function onMouseMove(x: number) {
        if (!move) return;
        if (!containerWidth || !containerLeft || !thumbWidth) return;
        let xRelative = x - (containerLeft);
        //console.log(xRelative);
        if (xRelative < thumbWidth / 2) return;
        if (xRelative >= (containerWidth - thumbWidth/2)) return;

        let a = (max - min)/(containerWidth - thumbWidth);
        let b = min - a * (thumbWidth/2);
        let newValue = Math.round((a * xRelative + b) / step + Number.EPSILON) * step;
        newValue = Math.min(Math.max(newValue, min), max);
        newValue = Number(newValue.toFixed(countDecimals(step)));
        onchange?.(newValue);
    }

    function getThumbLeft(value: number) {
        if (!containerWidth || !thumbWidth) return 0;
        return Math.max((value - min)/(max - min) * (containerWidth - thumbWidth), 0); // Security
    }
</script>

<!--Main container-->
<button type="button" bind:this={container} bind:clientWidth={containerWidth} onmousemove={(event) => onMouseMove(event.clientX)} ontouchmove={(event) => onMouseMove(event.touches[0].clientX)} onmouseenter={() => getDimensions()} ontouchstart={() => { getDimensions(); move = true }} onmousedown={() => move = true} onmouseup={() => move = false} ontouchend={() => move = false} onmouseleave={() => move = false} class="relative w-full grid grid-cols-[min-content_1fr] items-stretch justify-items-stretch py-2">
    <!--Track-->
    <div class="py-1 col-start-1 col-end-3 row-start-1 row-end-2 flex flex-col items-stretch justify-center">
        <div class="bg-slate-300 h-2"></div>
    </div>

    <!--Spacer-->
    <div style:width={`${getThumbLeft(value)}px`} class="col-start-1 col-end-2 row-start-1 row-end-2">
    </div>

    <!--Thumb-->
    <div class="col-start-2 col-end-3 row-start-1 row-end-2 self-center">
        <div>
            <div bind:clientWidth={thumbWidth} class="bg-slate-400 rounded-md h-[20px] w-[20px]"></div>
        </div>
    </div>
</button>
