<script lang="ts">
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
		| 'search'
		| 'textarea' = 'text'

	export let value: any = null
	let className = ''
	export { className as class }
	export let focus = false

	const setType = (node: HTMLInputElement) => {
		node.type = type
	}

	const setFocus = (node: HTMLInputElement | HTMLTextAreaElement) => {
		focus && node.focus()
	}
</script>

{#if type === 'textarea'}
	<textarea use:setFocus bind:value class={className} {...$$restProps} />
{:else}
	<input use:setType use:setFocus bind:value class={className} {...$$restProps} />
{/if}
