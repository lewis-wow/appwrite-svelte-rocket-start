<script lang="ts">
	export let columns = 3
	export let gap = 4
</script>

<div class="masonry-grid columns-{columns} gap-x-{gap}">
	<slot />
</div>

<style lang="scss">
	:global(div.masonry-grid *) {
		break-inside: avoid;
	}
</style>
