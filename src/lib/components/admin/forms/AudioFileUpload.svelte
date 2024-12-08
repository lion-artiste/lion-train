<script lang="ts">
    import Waveform from "$lib/components/Waveform.svelte";
    import { FileDropzone } from "@skeletonlabs/skeleton";
    import { Music } from "lucide-svelte";
    import type { HTMLInputAttributes } from "svelte/elements";
    import FieldContainer from "./FieldContainer.svelte";
    import AudioBlock from "../blocks/AudioBlock.svelte";

    interface Props extends HTMLInputAttributes {
        title: string;
        name: string;
        value?: string | null;
    }

    let {
        title,
        name,
        value,
        ...rest
    }: Props = $props();

    let audioFiles: FileList | undefined = $state(undefined);

    $effect(() => {
        console.log(value)
    })

</script>


<FieldContainer>
    {#snippet title()}{title}{#if rest.required} *{/if}{/snippet}
    {#snippet content()}
        <!--{#if value}
            <div class="relative h-[100px]">
                <AudioBlock source={value} />
            </div>
        {/if}-->
        <FileDropzone bind:files={audioFiles} {name} accept="audio/*" class="bg-blue-900 text-white" border="border-dashed border-blue-200" regionInterfaceText="flex flex-col items-center">
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