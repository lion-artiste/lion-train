<script lang="ts">
	import Email from '$lib/components/email/parts/Email.svelte';
    import P from '$lib/components/email/parts/P.svelte';
    import Button from '../parts/Button.svelte';
</script>

<Email preview="Verify your email">
	<P>Test test !</P>
	<Button href="">
		Je suis un super bouton :D
	</Button>
	<P>Et un autre paragraphe</P>
</Email>