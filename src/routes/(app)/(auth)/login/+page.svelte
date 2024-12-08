<script lang="ts">
    import FormContainer from "$lib/components/forms/FormContainer.svelte";
    import LoginForm from "$lib/components/forms/LoginForm.svelte";
	import type { FormErrors } from "$lib/components/forms/FormTypes.js";

	let { form } = $props();
	let errors = $derived(form?.errors as FormErrors);
</script>

<FormContainer>
	<LoginForm {errors}></LoginForm>
</FormContainer>