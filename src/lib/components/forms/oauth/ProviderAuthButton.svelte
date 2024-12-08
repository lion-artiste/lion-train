<script lang="ts">
    interface Props {
        create?: boolean;
        provider: "google" | "github" | "spotify";
    }

    let { create = false, provider }: Props = $props();

    let PROVIDERS = {
        google: {
            bg: "white",
            text: "black",
        },
        github: {
            bg:"#1e293b",
            text:"white"
        },
        spotify: {
            bg:"#0f172a",
            text:"white"
        }
    }
    
</script>

<a class="btn rounded-lg" href="login/{provider}" style:background-color={PROVIDERS[provider].bg} style:color={PROVIDERS[provider].text}>
    <span><img class="w-4 h-4" src="/images/icones/providers/{provider}.svg" alt={provider}/></span>
    <span>{#if create}Sign up with{:else}Sign in with{/if} {provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
</a>