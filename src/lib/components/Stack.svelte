<script lang="ts">
	export let space = '3rem'
</script>

<div class="layout-stack" style="--space: {space};">
	<slot />
</div>

<style lang="scss">
	:global(.layout-stack) {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		& > * {
			margin-block: 0;
		}

		& > * + * {
			margin-block-start: var(--space, 1.5rem);
		}
	}
</style>
