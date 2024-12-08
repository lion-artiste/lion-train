<script lang="ts">
    import { run } from 'svelte/legacy';

    import FormContainer from "$lib/components/forms/FormContainer.svelte";
    import type { FormErrors } from "$lib/components/forms/FormTypes.js";
    import Form from "$lib/components/forms/Form.svelte";
    import Input from "$lib/components/forms/Input.svelte";
    import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();

    let { form } = $props();

    $effect(() => {
        if (form?.success) toastStore.trigger({ message: "L'email de réinitialisation a bien été envoyé !", background:'variant-filled-success' });
    });
</script>

<FormContainer>
	<Form method="POST" action="/password-reset" submitButtonText="Send password reset email">
        <Input type="email" placeholder="Email" name="email" required={true}/>
    </Form>
</FormContainer>