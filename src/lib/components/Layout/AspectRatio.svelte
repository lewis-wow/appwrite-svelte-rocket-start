<script lang="ts">
	export let ratio: string
</script>

<div style="--ratio: {ratio};">
	<slot />
</div>

<style lang="scss">
	div {
		aspect-ratio: var(--ratio);
	}
</style>
