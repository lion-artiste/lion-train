<script lang="ts">
    import type { Key } from "@prisma/client";
    import googleIcon from "$lib/assets/images/icons/google.svg";
    import githubIcon from "$lib/assets/images/icons/github.svg";
    import credentialsIcon from "$lib/assets/images/icons/credentials.svg";

    interface Props {
        key: Key;
    }

    let { key }: Props = $props();

    let provider = $derived(key.id.split(":")[0])
    let icon = $derived(credentialsIcon)
</script>

<img src={icon} alt="Google" class="w-6 h-6" />