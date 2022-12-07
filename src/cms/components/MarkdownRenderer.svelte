<script>
	import 'bytemd/dist/index.css'
	import { Viewer } from 'bytemd'
	import gfm from '@bytemd/plugin-gfm'

	const plugins = [gfm()]

	export let value = ''
</script>

<div>
	<template>
		<Viewer {value} {plugins} />
	</template>
</div>
