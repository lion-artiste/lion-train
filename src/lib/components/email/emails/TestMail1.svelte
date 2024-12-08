<script lang="ts">
    import { Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email-tailwind'
    export let firstName = 'John'
    import Header from "$lib/components/email/parts/Header.svelte";
    import Footer from "$lib/components/email/parts/Footer.svelte";
    import P from "$lib/components/email/parts/P.svelte";
    import Button from "$lib/components/email/parts/Button.svelte";

    const fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
    
    const btnContainer = {
        textAlign: 'center' as const,
    };

</script>
    
<Html lang="en">
    <Head />
    <Preview preview="Welcome to svelte-email" />
    <Section class="bg-white">
        <Container class="pt-8 px-4 mx-auto my-0">
            <Header/>
            <P>{firstName}, welcome to svelte-email</P>
            <P>
                A Svelte component library for building responsive emails
            </P>
            <Section class="text-center">
                <Button href="https://github.com/carstenlebek/svelte-email">
                View on GitHub
                </Button>
            </Section>
            <P>Happy coding!</P>
            <Footer/>
        </Container>
    </Section>
</Html>