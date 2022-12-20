<script lang="ts">
	import { Link } from '$lib/components/Common'
	import { _ } from 'svelte-i18n'
</script>

<div class="flex justify-center mt-20">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
		<span class="block text-indigo-600">{$_('page.home.title')}</span>
		<p>
			<Link class="underline" href="https://appwrite.io/">Appwrite</Link>
		</p>
		<p>
			<Link class="underline" href="/oauth">OAuth</Link>
		</p>
		<p>
			<Link class="underline" href="https://github.com/lewis-wow/appwrite-svelte-rocket-start">Repository</Link>
		</p>
	</h1>
</div>
