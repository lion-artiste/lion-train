<script lang="ts">

    interface Props {
        state?: boolean;
        class?: string;
    }

    let { state = false, class: className = "" }: Props = $props();
    
</script>

<div class:bg-yellow-400={state} class:bg-slate-600={!state} class="absolute top-1 right-1 w-2 h-2 rounded-full {className}"></div>