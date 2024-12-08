<script lang="ts">
    import { Button } from "svelte-email-tailwind";
	import { primaryColor } from "./common";
	import type { Snippet } from "svelte";
	
	interface Props {
		href: string;
		bgColor?: string | null;
		children?: Snippet;
	}

	let { href, bgColor = null, children }: Props = $props();

    const style = {
		backgroundColor: bgColor ?? primaryColor,
		borderRadius: '5px',
		color: '#fff',
		fontSize: '16px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block'
	};
</script>

<Button pX={12} pY={12} {style} {href}>
    {@render children?.()}
</Button>