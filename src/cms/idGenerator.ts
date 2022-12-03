const gen = (function* () {
	let index = -1
	while (true) yield index++
})()

export default (pre: string = '') => `${pre}${gen.next().value}`
