<script lang="ts">
    import type { PageData } from './$types';
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    import Input from '$lib/components/admin/forms/Input.svelte';
    import { FlaskConical, Save, Send } from 'lucide-svelte';
    import Textarea from '$lib/components/admin/forms/Textarea.svelte';
    
    interface Props {
        data: PageData;
    }
    
    let { data }: Props = $props();
    let news = data.news;

    let sendVerif = $state(false);
    
    let SaveForm: null | HTMLFormElement = $state(null);

    function sendNews() {
        if (!sendVerif) {
            sendVerif = true;
        } else {
            if (SaveForm) {
                SaveForm.action = "?/send";
                SaveForm.submit();
                SaveForm.action = "?/save";
                sendVerif = false;
            }
        }
    }

    function sendTestNews() {
        if (SaveForm) {
            SaveForm.action = "?/sendTest";
            SaveForm.submit();
            SaveForm.action = "?/save";
            sendVerif = false;
        }
    }
</script>

<div class="w-full flex flex-row items-start justify-between">
    <ReturnButton href="/admin/news" display="News"/>
    <div class="flex flex-row items-center gap-3">
        <button onclick={() => SaveForm?.submit()} type="button" class="btn variant-filled bg-blue-800">
            <span><Save/></span>
            <span>Save</span>
        </button>
        <button type="button" class="btn variant-filled bg-green-600" onclick={() => sendTestNews()}>
            <div><FlaskConical size={20}/></div>
            <div>Send Test</div>
        </button>
        <button type="button" class="btn variant-filled bg-purple-800" onclick={() => sendNews()}>
            <div><Send size={20}/></div>
            <div>{#if !sendVerif}{#if news?.sent }Send again{:else}Send{/if}{:else}Confirm{/if}</div>
        </button>
    </div>
</div>


<form action="?/save" bind:this={SaveForm} class="flex flex-col items-stretch gap-4" method="post" enctype="multipart/form-data">

    <Input name="title" title="Title" value={news?.title} required/>

    <Textarea name="message" title="Message" value={news?.message} required/>

</form>