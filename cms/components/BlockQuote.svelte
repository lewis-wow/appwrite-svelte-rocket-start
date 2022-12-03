<script>
	import { Blockquote, P } from 'flowbite-svelte'
</script>

<Blockquote border bg class="p-4 my-4">
	<P height="relaxed">
		<slot />
	</P>
</Blockquote>
