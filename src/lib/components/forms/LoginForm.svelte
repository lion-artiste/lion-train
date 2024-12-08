<script lang="ts">
    import HorizontalDivider from "$lib/components/layout/HorizontalDivider.svelte";
    import Form from "./Form.svelte";
    import type { FormErrors, FormValues } from "./FormTypes";
    import Input from "./Input.svelte";
    import ProviderAuthButton from "./oauth/ProviderAuthButton.svelte";

    
    interface Props {
        errors: FormErrors | null;
        values?: FormValues | null;
    }

    let { errors, values = null }: Props = $props();
    let emailValue = $state((values && "email" in values) ? values.email : null);
    let passwordValue = $state((values && "password" in values) ? values.password : null);
    let formError = $derived((errors && "form" in errors) ? errors.form : null);
    let emailError = $derived((errors && "email" in errors) ? errors.email : null);
    let passwordError = $derived((errors && "password" in errors) ? errors.password : null);
</script>

<Form method="POST" action="/login" submitButtonText="Login" error={formError}>

    <ProviderAuthButton provider="google"/>
    <ProviderAuthButton provider="github"/>
    <ProviderAuthButton provider="spotify"/>
    <HorizontalDivider text="OR with credentials" padding="py-3"/>
    <Input type="email" placeholder="Email" name="email" required={true} bind:value={emailValue} error={emailError}/>
    <Input type="password" placeholder="Password" name="password" required={true} bind:value={passwordValue} error={passwordError}/>

    {#snippet bottomLinks()}
    
            <a href="/signup">Create an account</a>
            <a href="/password-reset">Forgot your password ?</a>
        
    {/snippet}
</Form>