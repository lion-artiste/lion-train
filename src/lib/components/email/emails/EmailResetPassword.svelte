<script lang="ts">
	import Email from '$lib/components/email/parts/Email.svelte';
    import Button from "$lib/components/email/parts/Button.svelte";
    import P from "$lib/components/email/parts/P.svelte";
	import A from "$lib/components/email/parts/A.svelte";

	interface Props {
		name?: string | null;
		tokenUrl?: string;
	}

	let {
		name = "{user}",
		tokenUrl = "{tokenUrl}"
	}: Props = $props();
</script>

<Email preview="Click this link to choose a new password">
	<P>Hello {name}, you asked to reset your password on Lion Train. If that's not the case, forget this email !</P>
	<P>To choose a new password, please click the button below.</P>
		<Button href={tokenUrl}>
			Reset your password
		</Button>
	<P>If the button doesn't work (some email clients may interfere with them), please copy/paste this link in your browser : <A href={tokenUrl}>{tokenUrl}</A></P>
</Email>