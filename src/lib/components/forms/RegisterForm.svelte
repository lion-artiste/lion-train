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
    let nameValue = $state(values?.name ?? null);
    let emailValue = $state(values?.email ?? null);
    let passwordValue = $state(values?.password ?? null);
    let formError = $derived(errors?.form ?? null);
    let nameError = $derived(errors?.name ?? null);
    let emailError = $derived(errors?.email ?? null);
    let passwordError = $derived(errors?.password ?? null);
</script>

<Form method="POST" action="/signup" submitButtonText="Sign up" error={formError}>

    <ProviderAuthButton provider="google" create={true}/>
    <ProviderAuthButton provider="github" create={true}/>
    <ProviderAuthButton provider="spotify" create={true}/>
    <HorizontalDivider text="OR with credentials" padding="py-3"/>
    <Input type="text" placeholder="Name" name="name" required={true} bind:value={nameValue} error={nameError}/>
    <Input type="email" placeholder="Email" name="email" required={true} bind:value={emailValue} error={emailError}/>
    <Input type="password" placeholder="Password" name="password" required={true} bind:value={passwordValue} error={passwordError}/>

    {#snippet bottomLinks()}
    
            <a href="/login">I'm already a user</a>
        
    {/snippet}
</Form>