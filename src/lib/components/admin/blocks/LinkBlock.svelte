<script lang="ts">
    
    interface Props {
        href?: string;
        display?: "underline" | "button" | "ghost";
        target?: string;
        class?: string;
        children?: import('svelte').Snippet;
    }

    let {
        href = "",
        display = "underline",
        target = "_blank",
        class: className = "",
        children
    }: Props = $props();
    
    let linkClasses = 
        $derived((display == "button") ? `btn btn-sm variant-filled bg-blue-700` :
        (display == "ghost") ? "" :
        (display == "underline") ? "underline" :
        "")
</script>

<a {target} class="{linkClasses} {className}" {href}>
    {@render children?.()}
</a>