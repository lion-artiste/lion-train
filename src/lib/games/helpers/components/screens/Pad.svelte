<script lang="ts">
    import type { Snippet } from "svelte";


    interface Props {
        state?: boolean;
        result?: boolean;
        win?: boolean;
        class?: string;
        classActive?: string;
        classInactive?: string;
        classWin?: string;
        classLose?: string;
        children?: Snippet;
        onclick?: () => void;
    }

    let {
        state = false,
        result = false,
        win = false,
        class: className = "",
        classActive = 'bg-slate-500',
        classInactive = 'bg-slate-600',
        classWin = "bg-green-500 !text-white",
        classLose = "bg-red-500 !text-white",
        children,
        onclick = () => {}
    }: Props = $props();

</script>

<button onclick={() => onclick()} class="grid grid-cols-1 grid-rows-1 items-center justify-items-center [&>*]:col-start-1 [&>*]:col-end-1 border-b-2 border-b-blue-950 hover:border-b-0 hover:border-t-slate-200 hover:border-t-2 h-full w-full cursor-pointer relative {(result) ? (win) ? classWin : classLose : (state) ? classActive : classInactive} {className}">
    {@render children?.()}
</button>