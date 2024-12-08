<script lang="ts">
	import { Container, Head, Html, Preview, Section } from 'svelte-email-tailwind';
    import Footer from './Footer.svelte';
    import Header from './Header.svelte';
    import type { Snippet } from 'svelte';

    interface Props {
        preview?: string | null
        children?: Snippet | null
    }

    let {
        preview = null,
        children = null
    }: Props = $props();

	const container = {
		margin: '0 auto',
		padding: '40px 10px',
	};

    const section = {
        backgroundColor: "white"
    }
</script>
    
<Html lang="en">
    <Head />
    {#if preview}
    <Preview {preview} />
    {/if}
    <Section style={section}>
        <Container style={container}>
            <Header/>
            {@render children?.()}
            <Footer/>
    </Container>
    </Section>
</Html>