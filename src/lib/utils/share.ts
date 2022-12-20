export default async (data) => {
	try {
		await navigator.share(data)
	} catch (e) {
		navigator.clipboard.writeText(data.url || window.location.href)
	}

	return true
}
