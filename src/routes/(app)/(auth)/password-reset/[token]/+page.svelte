<script lang="ts">
    import FormContainer from "$lib/components/forms/FormContainer.svelte";
    import type { FormErrors } from "$lib/components/forms/FormTypes.js";
    import Form from "$lib/components/forms/Form.svelte";
    import Input from "$lib/components/forms/Input.svelte";

    let { form } = $props();
</script>

<FormContainer>
	<Form method="POST" submitText="Reset your password">
        <Input type="password" placeholder="New password" name="password" required={true}/>
    </Form>
</FormContainer>