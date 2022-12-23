<script lang="ts">
	import { Button } from '$lib/components/Common'
	import { _ } from 'svelte-i18n'
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
