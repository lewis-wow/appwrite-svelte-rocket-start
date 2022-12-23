<script lang="ts">
	import { user } from '$lib/auth'
	import { Button } from '$lib/components/Common'
	import { onMount } from 'svelte'
	import { _ } from 'svelte-i18n'
	import { navigate } from '$lib/router'

	onMount(() => {
		if (!$user) navigate('/oauth')
	})
</script>

<div class="flex justify-center mt-20">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
		<span class="block text-indigo-600">{$_('page.home.title')}</span>
		<p>
			<Button class="underline" href="https://appwrite.io/">Appwrite</Button>
		</p>
		<p>
			<Button class="underline" href="/oauth">OAuth</Button>
		</p>
		<p>
			<Button class="underline" href="https://github.com/lewis-wow/appwrite-svelte-rocket-start">Repository</Button>
		</p>
	</h1>
</div>
