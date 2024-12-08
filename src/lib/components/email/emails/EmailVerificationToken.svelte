<script lang="ts">
	import Email from '$lib/components/email/parts/Email.svelte';
    import P from '$lib/components/email/parts/P.svelte';
    import Button from '$lib/components/email/parts/Button.svelte';
    import A from '$lib/components/email/parts/A.svelte';

	interface Props {
		name? : string;
		tokenUrl?: string;
	}

	let {
		name = "{user}",
		tokenUrl = "{tokenUrl}"
	}: Props = $props();
</script>

<Email preview="Validate your email to confirm your account !">
	<P>Hello {name}, I'm happy to welcome you on Lion Train, and I hope that these little games will help you become a better producer/mix engineer !</P>
	<P>In order to finish the creation of your new account, please click on the button below to validate your email.</P>
	<Button href={tokenUrl}>
		Validate your email
	</Button>
	<P>If the button doesn't work (some email clients may interfere with them), please copy/paste this link in your browser : <A href={tokenUrl}>{tokenUrl}</A></P>
</Email>