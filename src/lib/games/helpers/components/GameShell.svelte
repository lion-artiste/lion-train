<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        topLeft?: Snippet;
        topCenter?: Snippet;
        topRight?: Snippet;
        mainWindow?: Snippet;
        bottomLeft?: Snippet;
        bottomCenter?: Snippet;
        bottomRight?: Snippet;
    }

    let {
        topLeft,
        topCenter,
        topRight,
        mainWindow,
        bottomLeft,
        bottomCenter,
        bottomRight
    }: Props = $props();

</script>

<div class="flex flex-col items-stretch gap-y-3 bg-slate-200 w-full p-3 px-4 text-black text-xl rounded-lg">

    <!-- Top row -->
    <div class="grid grid-cols-3 justify-items-center text-2xl items-center">

        <!--Top left-->
        <div class="justify-self-start">
            {@render topLeft?.()}
        </div>

        <!--Top middle-->
        <div>
            {@render topCenter?.()}
        </div>

        <div class="justify-self-end">
            {@render topRight?.()}
        </div>
        
    </div>

    <div>
        {@render mainWindow?.()}
    </div>

    <!-- Bottom row -->
    <div class="grid grid-cols-3 justify-items-center text-2xl items-center">

        <div class="justify-self-start flex flex-row gap-x-2">
            {@render bottomLeft?.()}
        </div>

        <div>
            {@render bottomCenter?.()}
        </div>

        <div class="justify-self-end flex flex-row gap-x-2">
            {@render bottomRight?.()}
        </div>

    </div>
</div>