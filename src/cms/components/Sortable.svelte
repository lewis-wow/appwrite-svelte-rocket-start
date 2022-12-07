<script>
	import { createEventDispatcher } from 'svelte'
	import { flip } from 'svelte/animate'

	export let list
	export let key = 'id'
	export let element = 'div'
	export let active = true

	const dispatch = createEventDispatcher()

	let source = null
	let isOver = false

	const start = (e, id) => {
		e.dataTransfer.clearData()
		e.dataTransfer.setData('text/plain', id)
	}

	const over = (target) => isOver !== target.id && (isOver = target.id)
	const leave = () => isOver === source?.id && (isOver = false)

	const reorder = (source, target) => {
		if (!active || !source || !target) return
		if (source.id === target.id) return

		const { order: sourceIndex } = source
		const { order: targetIndex } = target

		isOver = false

		list[sourceIndex] = [list[targetIndex], (list[targetIndex] = list[sourceIndex])][0]
		list = list

		dispatch('reorder', { source, target })
		source = null
	}
</script>

{#each list as item, order (item[key])}
	<svelte:element
		this={element}
		draggable={active}
		on:dragstart={(e) => (source = { order, id: item[key] }) && start(e, source.id)}
		on:dragover|preventDefault={() => over({ order, id: item[key] })}
		on:dragleave={leave}
		on:dragenter|preventDefault={() => null}
		on:drop|preventDefault={() => reorder(source, { order, id: item[key] })}
		animate:flip={{ duration: source !== null ? 300 : 0 }}
		class:over={item[key] === isOver}
	>
		<slot {item} {order} index={order} />
	</svelte:element>
{/each}

<style>
	.over {
		border-color: rgba(48, 12, 200, 0.2);
	}
</style>
