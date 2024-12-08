<script lang="ts">
    import type { PageData } from './$types';
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    import Input from '$lib/components/admin/forms/Input.svelte';
    import { Save } from 'lucide-svelte';
    import MultiSelectInput from '$lib/components/admin/forms/MultiSelectInput.svelte';
    import type { Option } from '$lib/components/admin/forms/MultiSelectInput.svelte';
    import BooleanInput from '$lib/components/admin/forms/BooleanInput.svelte';
    import Textarea from '$lib/components/admin/forms/Textarea.svelte';
    
    interface Props {
        data: PageData;
    }
    
    let { data }: Props = $props();
    
    let Form: null | HTMLFormElement = $state(null);
</script>

<div class="w-full flex flex-row items-start justify-between">
    <ReturnButton href="/admin/news" display="News"/>
    <div class="flex flex-row items-center gap-3">
        <button onclick={() => Form?.submit()} type="button" class="btn variant-filled bg-blue-800">
            <span><Save/></span>
            <span>Save</span>
        </button>
    </div>
</div>


<form bind:this={Form} class="flex flex-col items-stretch gap-4" method="post" enctype="multipart/form-data">

    <Input name="title" title="Title" required/>

    <Textarea name="message" title="Message" required/>

</form>

<button onclick={() => Form?.submit()} type="button" class="fixed bottom-3 right-3 z-30 btn variant-filled bg-blue-800 shadow-lg">
    <span><Save/></span>
    <span>Create</span>
</button>