<script lang="ts">
    import type { Key, User } from "@prisma/client";
    import googleIcon from "$lib/assets/images/icons/google.svg";
    import githubIcon from "$lib/assets/images/icons/github.svg";
    import credentialsIcon from "$lib/assets/images/icons/credentials.svg";
    import spotifyIcon from "$lib/assets/images/icons/spotify.svg";

    interface Props {
        user: User;
    }

    let { user }: Props = $props();

    function getKeys(user: User) {
        let keys = [];
        if (user.hashed_password) keys.push("credentials");
        if (user.google_id) keys.push("google");
        if (user.github_id) keys.push("github");
        if (user.spotify_id) keys.push("spotify");
        return keys
    }

    function getIcon(key: string) {
        switch (key) {
            case "google":
                return googleIcon;
            case "github":
                return githubIcon;
            case "credentials":
                return credentialsIcon;
            case "spotify":
                return spotifyIcon
            default:
                return ""
        }
    }
    let keys = $derived(getKeys(user));
</script>

<div class="flex flex-row items-center gap-1">
    {#each keys as key}
    <img src={getIcon(key)} alt="Key icon" class="w-6 h-6" />
    {/each}
</div>