<script lang="ts">
    import { Img } from 'svelte-email-tailwind';
    import { env } from '$env/dynamic/public';

    const logo = {
        margin: '20px auto 40px',
    };
</script>

<Img 
    src={`${env.PUBLIC_BASE_URL}/images/meta/logo_noir.png`}
    alt="Lion logo" 
    style={logo}
    width="90" 
    height="50"
/>