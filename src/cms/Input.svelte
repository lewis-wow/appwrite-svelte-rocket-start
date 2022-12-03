<script lang="ts">
	import { Input, Label, Helper } from 'flowbite-svelte'
	import id from './idGenerator'

	const elementId = id('input-')

	export let label = ''
	export let value = ''
	export let error: string = null

	export let type:
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'reset'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
		| 'search' = 'text'
</script>

<div class="mb-6">
	<Label for={elementId} color={error ? 'red' : null} class="mb-2">{label}</Label>

	<Input bind:value {type} color={error ? 'red' : null} id={elementId} {...$$props}>
		<slot />
	</Input>

	{#if error}
		<Helper class="mt-2" color="red">
			<span class="font-medium">Error!</span>
			{error}
		</Helper>
	{/if}
</div>
