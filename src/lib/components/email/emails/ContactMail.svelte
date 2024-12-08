<script lang="ts">
	import Email from '$lib/components/email/parts/Email.svelte';
    import P from "$lib/components/email/parts/P.svelte";
	import A from "$lib/components/email/parts/A.svelte";

	interface Props {
		name?: string;
		email?: string;
		object?: string;
		message?: string;
	}

	let {
		name = "{user}",
		email = "{email}",
		object = "{object}",
		message = "{message}"
	}: Props = $props();
</script>

<Email preview="New contact on Lion Train !">
	<P>A new user contacted you through your contact form :</P>
	<P><b>Name :</b> {name}</P>
	<P><b>Email :</b> <A href={"mailto:" + email}>{email}</A></P>
	<P><b>Object :</b> {object}</P>
	<P><b>Message :</b></P>
	<P>{message}</P>
</Email>