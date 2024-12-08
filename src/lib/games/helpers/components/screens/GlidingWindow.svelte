<script lang="ts">

    import { onMount } from "svelte";
    import { Spring, Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
    import { cn } from "$lib/utils";

    interface Props {
        showResult?: boolean;
        win?: boolean;
        rightPosition: number;
        rightValue: number;
        positionToValue: (p: number) => number;
        topRowValues: number[];
        bottomRowValues: number[];
        percentGame?: number;
        widthBegin: number;
        widthEnd: number;
        unit?: string;
        pMin?: number;
        pMax?: number;
        onclick?: (position: number, left: number, right: number) => void;
        ontop?: () => void;
        onbottom?: () => void;
        textUp?: string;
        textDown?: string;
        processingActivated?: boolean;
        useTopBottom?: boolean;
    }

    let {
        showResult = false,
        win = false,
        rightPosition,
        rightValue,
        positionToValue,
        topRowValues,
        bottomRowValues,
        percentGame = 0.0,
        widthBegin,
        widthEnd,
        unit = "",
        pMin = 0,
        pMax = 100,
        onclick,
        ontop,
        onbottom,
        textUp,
        textDown,
        processingActivated = false,
        useTopBottom = true
    }: Props = $props();
    
    
    let displayState: "win" | "lose" | "neutral" = $derived(showResult ? (win ? "win" : "lose") : "neutral");
    
    let x: number = $state(0);
    let y: number = $state(-1);

    let windowLeft = new Spring(0, {
        stiffness: 0.18,
        damping: 0.35
    });
    
	let windowWidth = new Tween(0, {
		duration: 400,
		easing: cubicOut
	});
    
    let mainElement: HTMLElement | undefined = $state(undefined);
    let mainElementWidth: number = $state(0);
    let mainElementHeight: number = $state(0);
    let mainElementLeft: number = $state(0);
    let mainElementMiddle: number = $state(0);

    function getElementClientRect() {
        let clientRect = mainElement?.getBoundingClientRect();
        mainElementLeft = clientRect ? clientRect.left : 0;
        mainElementMiddle = clientRect ? (clientRect.top + mainElementHeight/2) : 0;
    }

    function handleMouseEnter () {
        getElementClientRect();
    }

    function handleClick () {
        onclick?.(position, windowLeft.current / mainElementWidth, (windowLeft.target + windowWidth.target) / mainElementWidth)
    }

    function handleMouseMove (newX: number, newY: number) {
        x = newX;
        windowLeft.target = mainElementLeft ? (Math.min(Math.max(x - mainElementLeft, pMinPixel), pMaxPixel) - windowWidth.target / 2) : 0;
        if (y < mainElementMiddle && newY >= mainElementMiddle && useTopBottom) { onbottom?.(); }
        else if (y > mainElementMiddle && newY <= mainElementMiddle && useTopBottom) { ontop?.(); }
        else if (y == -1 && newY >= mainElementMiddle && useTopBottom) { onbottom?.(); }
        else if (y == -1 && newY <= mainElementMiddle && useTopBottom) { ontop?.(); }
        y = newY;
    }

    onMount(() => {
        getElementClientRect();
        if (mainElementLeft && mainElementWidth) windowLeft.target = (mainElementWidth / 2 - windowWidth.target / 2);
    })
    
    let pMinPixel = $derived(pMin * mainElementWidth);
    let pMaxPixel = $derived(pMax * mainElementWidth);
    let position = $derived((x - mainElementLeft) / mainElementWidth);
    
    $effect(() => {
        windowWidth.target = ( (widthEnd - widthBegin) * (pMaxPixel - pMinPixel) * percentGame / 10000 + widthBegin * (pMaxPixel - pMinPixel) / 100 );
    });

    function NWL(classN: string, classW: string, classL: string) {
        return (displayState == "neutral") ? classN : (displayState == "win") ? classW : classL
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div bind:this={mainElement} bind:clientWidth={mainElementWidth} bind:clientHeight={mainElementHeight} onmousemove={(event) => {handleMouseMove(event.clientX, event.clientY); }} ontouchmove={(event) => { let touches = event.touches[0]; handleMouseMove(touches.clientX, touches.clientY); }} onmouseup={handleClick} ontouchend={handleClick} ontouchstart={handleMouseEnter} onmouseenter={handleMouseEnter} class="self-stretch relative justify-self-stretch h-full flex flex-col cursor-pointer overflow-x-hidden touch-none select-none">
    
    <!--Processing activated screens-->
    {#if useTopBottom}
    <div class:bg-yellow-100={processingActivated && displayState == "neutral"} class="absolute w-full h-full top-0 left-0 flex flex-col items-stretch text-slate-300 text-sm select-none">
        <div class:text-yellow-400={processingActivated && displayState == "neutral"} class:border-b-yellow-400={processingActivated && displayState == "neutral"} class:border-b-slate-300={!processingActivated} class="grow border-b-[2px] z-[15] border-dashed flex flex-col items-center justify-end select-none">{textUp ?? "On"}</div>
        <div class:text-yellow-400={processingActivated && displayState == "neutral"} class="grow flex flex-col items-center justify-start z-[15] select-none">{textDown ?? "Off"}</div>
    </div>
    {/if}

    <!-- Background -->
    <div class="grow flex flex-row z-10">
        {#each topRowValues as value, i}
        <div class:border-r-2={i < topRowValues.length - 1} class:border-r-0={i == topRowValues.length - 1} class:border-r-yellow-200={processingActivated && displayState == "neutral"} class="flex flex-col items-stretch grow border-r-slate-200 min-w-0 basis-full">
            <div class="grow"></div>
            <div class="text-center text-slate-500 text-[80%] hidden md:block">{value}{unit}</div>
        </div>
        {/each}
    </div>
    <div class="self-stretch flex flex-row z-10">
        <div class="basis-1/2"></div>
        {#each bottomRowValues as value, i}
        <div class="basis-full min-w-0 text-center text-slate-500 text-[80%] hidden md:block">{value}{unit}</div>
        {/each}
        <div class="basis-1/2"></div>
    </div>

    
    <!-- Limits -->
    <div style:width={`${pMinPixel}px`} class="diagonal-background absolute left-0 h-full">
        <div class="w-[2px] h-full absolute right-0 bg-slate-400"></div>
    </div>
    <div style:width={`${mainElementWidth - pMaxPixel}px`} class="diagonal-background absolute right-0 h-full">
        <div class="w-[2px] h-full absolute left-0 bg-slate-400"></div>
    </div>

    <!-- Sliding window -->
    <div style:left={`${windowLeft.current}px`} style:width={`${windowWidth.current}px`} class={cn("absolute h-full grid select-none grid-cols-1 grid-rows-[1fr_min-content_2fr] items-center justify-items-center z-20", NWL("bg-slate-400/40", "bg-green-400/40", "bg-red-400/40"))}>
        <div class={cn("w-[2px] h-full", NWL("bg-slate-800", "bg-green-500", "bg-red-500"))}></div>
        <div class="{cn("font-bold select-none", NWL("text-slate-800", "text-green-500", "text-red-500"))}">{positionToValue(position)}{unit}</div>
        <div class={cn("w-[2px] select-none h-full", NWL("bg-slate-800", "bg-green-500", "bg-red-500"))}></div>
    </div>

    <!-- Answer -->
    {#if showResult}
    <div style:left={`${rightPosition * mainElementWidth - 100}px`} class="absolute top-0 h-full w-[200px] grid grid-cols-1 grid-rows-[1fr_min-content_4fr] items-center justify-items-center z-20">
        <div class="h-full w-[2px] bg-blue-500"></div>
        <div class="text-blue-500 font-bold">{rightValue}{unit}</div>
        <div class="h-full w-[2px] bg-blue-500"></div>
    </div>
    {/if}
</div>

<style>
.diagonal-background {
    background: repeating-linear-gradient(
        -45deg,
        rgba(226,232,240,0.3),
        rgba(226,232,240,0.3) 10px,
        rgba(148,163,184,0.8) 10px,
        rgba(148,163,184,0.8) 20px
    );
    }
</style>
