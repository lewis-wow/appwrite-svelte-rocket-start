import '../src/app.css'
import Cms from './cms.svelte'

const cms = new Cms({
	target: document.getElementById('cms')
})

export default cms
