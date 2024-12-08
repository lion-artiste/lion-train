<script lang="ts">
    import { Hr, Text, Link } from 'svelte-email-tailwind';
    import { fontFamily } from './common';

    const hr = {
        borderColor: '#cccccc',
        margin: '20px 0',
    };
    
    const footer = {
        fontFamily,
        color: '#8898aa',
        fontSize: '12px',
    };
</script>

<Hr style={hr} />
<Text style={footer}>
    Go to <Link href="https://lion-train.fr/">Lion Train</Link>
    <br/>
    Coded with love by <Link href="https://www.instagram.com/lion.artiste/">Lion</Link>
</Text>