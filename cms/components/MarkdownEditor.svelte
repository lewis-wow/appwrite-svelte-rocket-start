<script>
	import 'bytemd/dist/index.css'
	import { Editor } from 'bytemd'
	import gfm from '@bytemd/plugin-gfm'

	const plugins = [gfm()]

	export let value = ''
</script>

<div>
	<template>
		<Editor {value} {plugins} on:change={(e) => (value = e.detail.value)} />
	</template>
</div>
