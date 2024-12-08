<script lang="ts">
    import TextButton from "$lib/games/helpers/components/buttons/TextButton.svelte";
import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    interface Props extends HTMLAnchorAttributes {
        children: Snippet;
        icon?: Snippet<[number]>;
        size?: number;
    }

    let { children, icon, size = 20, ...rest }: Props = $props();

</script>

<a {...rest}>
    <TextButton class="bg-slate-200 text-black">
        <div class="flex flex-row items-center gap-2">
            <div class="text-blue-800">
                {@render icon?.(size)}
            </div>
            {@render children()}
        </div>
    </TextButton>
</a>