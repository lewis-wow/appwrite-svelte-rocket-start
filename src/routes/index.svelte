<script lang="ts">
	import { account, user } from '$lib/auth'
	import { Button } from '$lib/components/Common'
	import { ID } from 'appwrite'
	import { _ } from 'svelte-i18n'
</script>

<div class="flex flex-col mt-20">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-5">
		<span class="block text-indigo-600">{$_('page.home.title')}</span>
		<p>
			<Button class="underline" href="https://appwrite.io/">Appwrite</Button>
		</p>
		<p>
			<Button class="underline" href="https://github.com/lewis-wow/appwrite-svelte-rocket-start">Repository</Button>
		</p>
	</h1>

	<div class="text-xl font-bold tracking-tight text-gray-900">
		{#if $user}
			<div>
				<p>
					<Button class="underline" on:click={() => account.deleteSession('current')}>Logout</Button>
				</p>

				<p>
					<b>user:</b>
					{$user.email}
				</p>
			</div>
		{:else}
			<div>
				<p>
					<Button class="underline" on:click={() => account.create(ID.unique(), 'example@example.com', 'password')}>Register</Button>
				</p>
				<p>
					<Button class="underline" on:click={() => account.createEmailSession('example@example.com', 'password')}>Login</Button>
				</p>
			</div>
		{/if}
	</div>
</div>
