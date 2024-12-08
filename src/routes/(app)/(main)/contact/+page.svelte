<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import FormContainer from '$lib/components/forms/FormContainer.svelte';
    import Input from '$lib/components/forms/Input.svelte';

    let { data, form }: { data: PageData, form: ActionData } = $props();
    import Form from '$lib/components/forms/Form.svelte';
    import Textarea from '$lib/components/forms/Textarea.svelte';
    import { ThumbsUp } from 'lucide-svelte';
</script>

{#if form?.success}
<FormContainer>
    <div class="flex flex-row items-center gap-2 flex-nowrap">
        <div class="text-black font-sstv text-xl text-center relative top-[1px]">Your message has been sent, thank you !</div>
        <div class="text-black"><ThumbsUp/></div>
    </div>
</FormContainer>
{:else}
<FormContainer>
    <Form method="POST" submitButtonText="Send">
        <Input name="email" type="email" placeholder="Your email" required/>
        <Input name="name" placeholder="Your name" required/>
        <Input name="object" placeholder="Object"/>
        <Textarea name="message" placeholder="Write here your message"></Textarea>
        <Input hidden name="antispam"/>
    </Form>
</FormContainer>
{/if}