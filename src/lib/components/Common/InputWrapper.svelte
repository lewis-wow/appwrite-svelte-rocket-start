<script lang="ts">
	import generateElementId from '$lib/utils/elementIdGenerator'
	let className = ''
	export { className as class }
</script>

<div class={className}>
	<slot id={generateElementId()} />
</div>
