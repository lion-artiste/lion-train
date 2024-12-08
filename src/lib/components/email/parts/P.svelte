<script lang="ts">
    import type { Snippet } from "svelte";
    import { Text } from "svelte-email-tailwind";

	interface Props {
		children?: Snippet;
		class?: string | null;
	}

	let { children, class: classes = null }: Props = $props();

    const style = {
		fontSize: '16px',
		lineHeight: '26px'
	};
</script>

<Text {style}>
    {@render children?.()}
</Text>