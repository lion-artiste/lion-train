<script lang="ts">
    import { Music, Save } from 'lucide-svelte';
    import type { PageData } from './$types';
    import { FileDropzone } from '@skeletonlabs/skeleton';
    import TextInput from '$lib/components/admin/forms/Input.svelte';
    import Waveform from '$lib/components/Waveform.svelte';
    import AudioFileUpload from '$lib/components/admin/forms/AudioFileUpload.svelte';
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    
    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let source = $derived(data.source);

    let audioFiles: FileList;

    let Form: HTMLFormElement | null = $state(null);

    $effect(() => {
        console.log("Source : ", source)
    })
</script>

<ReturnButton href="/admin/sources" display="Sources"/>

<form bind:this={Form} class="flex flex-col items-stretch gap-4" method="post" enctype="multipart/form-data">

    <TextInput name="name" title="Name" value={source?.name} required/>

    <TextInput name="author" title="Author" value={source?.author} required/>

    <TextInput name="link" title="Link" value={source?.link} required/>

    <AudioFileUpload name="audio" value={source?.audio} title="Audio"/>

</form>

<button onclick={() => Form?.submit()} type="button" class="fixed bottom-3 right-3 z-30 btn variant-filled bg-blue-800 shadow-lg">
    <span><Save/></span>
    <span>Save</span>
</button>

