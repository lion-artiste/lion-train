<script lang="ts">
    import FormContainer from "$lib/components/forms/FormContainer.svelte";
    import RegisterForm from "$lib/components/forms/RegisterForm.svelte";
    import type { FormErrors } from "$lib/components/forms/FormTypes.js";

    let { form } = $props();
    let errors = $derived(form?.errors as FormErrors);
</script>

<FormContainer>
	<RegisterForm {errors}></RegisterForm>
</FormContainer>