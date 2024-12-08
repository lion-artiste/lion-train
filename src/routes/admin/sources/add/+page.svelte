<script lang="ts">
    import { Music, Save } from 'lucide-svelte';
    import { FileDropzone } from '@skeletonlabs/skeleton';
    import TextInput from '$lib/components/admin/forms/Input.svelte';
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    import FieldContainer from '$lib/components/admin/forms/FieldContainer.svelte';

    let audioFiles: FileList | undefined = $state(undefined);

    let Form: null | HTMLFormElement = $state(null);
</script>

<ReturnButton href="/admin/sources" display="Sources"/>

<form bind:this={Form} class="flex flex-col items-stretch gap-4" method="post" enctype="multipart/form-data">

    <TextInput name="name" title="Name" required/>

    <TextInput name="author" title="Author" required/>

    <TextInput name="link" title="Link" required/>

    <FieldContainer>
        {#snippet title()}<span>Audio *</span>{/snippet}
        {#snippet content()}
            <FileDropzone bind:files={audioFiles} name="audio" id="audio" accept="audio/*" class="bg-blue-900 text-white" border="border-dashed border-blue-200" regionInterfaceText="flex flex-col items-center">
                {#snippet lead()}
                            <Music size="30"/>
                        {/snippet}
                {#snippet message()}
                            Upload an audio file or drag-and-drop
                        {/snippet}
                {#snippet meta()}
                    {#if audioFiles}{audioFiles[0].name}{:else}No file selected{/if}
                {/snippet}
            </FileDropzone>
        {/snippet}
    </FieldContainer>

</form>

<button onclick={() => Form?.submit()} type="button" class="fixed bottom-3 right-3 z-30 btn variant-filled bg-blue-800 shadow-lg">
    <span><Save/></span>
    <span>Create</span>
</button>

