const generator = (function* () {
	let index = -1
	while (true) yield index++
})()

export default (pre: string = 'input') => `${pre.split(' ').join('-')}-${generator.next().value}`
