<script lang="ts">
	let className = ''
	export { className as class }
</script>

<div class="{className} flex flex-col justify-start">
	<slot />
</div>
