<script lang="ts">
    import Waveform from "$lib/components/Waveform.svelte";

    interface Props {
        source: string; //export let loop: boolean = false;
    }

    let { source }: Props = $props();
    
    $effect(() => {
        console.log("Audio block source : ", source)
    })
    
</script>

<!--<audio controls>
    <source src={source}>
    Your browser does not support the audio tag.
</audio>-->

<Waveform audio={source} color="blue"/>