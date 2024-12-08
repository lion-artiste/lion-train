<script lang="ts">
	import Email from '$lib/components/email/parts/Email.svelte';
    import { Text, Heading } from 'svelte-email-tailwind';

	interface Props {
		title?: string;
		message?: string;
	}

	let {
		title = "Lorem Ipsum dolor si amet",
		message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur enim vel viverra pellentesque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies malesuada urna sed ultrices. Phasellus porttitor volutpat lorem, non auctor neque ultrices sit amet. Praesent sed vulputate nunc. Vestibulum sagittis iaculis sapien, non imperdiet libero euismod eu. Duis mollis non tellus a ultrices. Sed sagittis velit ut leo fermentum condimentum. Nullam tempus, tellus quis laoreet pellentesque, urna augue tempus sem, nec congue tortor diam nec dolor. Maecenas mauris augue, dictum ac neque vestibulum, imperdiet suscipit diam. Curabitur dapibus lectus ante, fringilla aliquam nibh finibus sit amet.

Nullam neque lectus, lobortis quis enim et, tincidunt lacinia nunc. In velit erat, ornare et velit eget, suscipit iaculis elit. Cras dictum, purus id finibus mollis, dui augue elementum turpis, vel sagittis leo leo in ligula. Suspendisse eget imperdiet ligula. Maecenas semper leo eu lacus rhoncus cursus. Morbi consequat placerat rhoncus. Suspendisse nec ultricies ipsum. Curabitur iaculis lacinia condimentum.

Sed eget nisi diam. Aliquam sollicitudin lorem eget mauris vehicula mattis. Maecenas ut orci lorem. Donec non sollicitudin mi. Curabitur vitae magna in diam euismod consectetur. Ut molestie ex vitae maximus mollis. Nulla odio enim, tincidunt sed augue eget, vulputate condimentum nunc. Morbi pretium libero sit amet tortor convallis vehicula.

Nullam cursus finibus sapien, id sollicitudin nulla molestie quis. In quis metus facilisis massa interdum feugiat in at sem. Proin condimentum egestas vestibulum. Proin vitae tristique justo. Suspendisse in lacus iaculis, venenatis ipsum id, viverra felis. Fusce accumsan sollicitudin enim, vitae finibus justo ornare ac. Maecenas nibh magna, fermentum ac pharetra quis, ullamcorper id diam. Donec eu mollis nisi, a posuere lorem. Integer sed purus dolor. Aliquam erat volutpat. Ut velit quam, rutrum eget rutrum id, placerat id ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Nunc eros quam, pellentesque nec turpis eget, finibus maximus orci. Aliquam erat volutpat. Proin rutrum leo vel est posuere, eu laoreet mauris varius. Nulla feugiat sapien eget pharetra venenatis. Aenean quis ipsum et enim vestibulum tempus ac sed erat. Vestibulum interdum vel sem ac rutrum. Sed venenatis iaculis dui non suscipit. Nulla et ante non tellus aliquet vehicula et a dolor. In suscipit commodo quam, consectetur suscipit arcu venenatis vitae.`
	}: Props = $props();

	const style = {
		fontSize: '14px',
		lineHeight: '26px',
		fontFamily: "monospace",
		textAlign: "justify" as const
	};

	const h1 = {
		fontSize: '20px',
		lineHeight: '60px',
		fontFamily: "monospace",
		textDecoration: "bold"
	};
</script>

<Email preview={title}>
	<Heading as="h1" style={h1}>{title}</Heading>
	<Text {style}>
		{@html message.replace(/\r\n|\r|\n/g,"<br/>")}
	</Text>
</Email>