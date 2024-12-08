<script lang="ts">
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    import Input from '$lib/components/admin/forms/Input.svelte';
    import { Save } from 'lucide-svelte';
    import type { PageData } from './$types';
    import MultiSelectInput from '$lib/components/admin/forms/MultiSelectInput.svelte';
    import type { Option } from '$lib/components/admin/forms/MultiSelectInput.svelte';
    import BooleanInput from '$lib/components/admin/forms/BooleanInput.svelte';
    
    interface Props {
        data: PageData;
    }
    
    let { data }: Props = $props();
    
    let sources: Option[] = $derived(data.sources.map( (source) => {
        return {id: `${source.id}`, display: source.name, audio: source.audio }
    } ))
    let sourcesSelected: string[] = [];
    
    let Form: null | HTMLFormElement = $state(null);
</script>

<ReturnButton href="/admin/playlists" display="Playlists"/>


<form bind:this={Form} class="flex flex-col items-stretch gap-4" method="post" enctype="multipart/form-data">

    <Input name="name" title="Name" required/>

    <Input name="slug" title="Slug" required/>

    <Input name="description" title="Description"/>
    
    <MultiSelectInput display="Sources" options={sources} selected={sourcesSelected} name="sources" />

    <BooleanInput name="default" title="Default ?" textChecked="Default" textUnchecked="Not default"/>

</form>

<button onclick={() => Form?.submit()} type="button" class="fixed bottom-3 right-3 z-30 btn variant-filled bg-blue-800 shadow-lg">
    <span><Save/></span>
    <span>Create</span>
</button>