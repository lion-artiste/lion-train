<script lang="ts">
    import { Link } from "svelte-email-tailwind";
    import { primaryColor } from "./common";

	interface Props {
		href: string;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();

	const style = {
		color: primaryColor,
		textDecoration: 'none'
	}
</script>

<Link {href} {style}>
    {@render children?.()}
</Link>