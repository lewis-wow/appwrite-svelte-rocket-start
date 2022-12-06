# Svelte + Appwrite = 🚀

Blazing fast development with done backend and fully-prepared frontend.

CMS ready!

## Appwrite installation

[Appwrite installation](https://appwrite.io/docs/installation)

## Frontend included

* tailwind
* scss
* css reset
* typescript
* routing
* ready routes
* oauth
* folder structure
* common components
* service worker
* path aliases
* database realtime subscribers
* i18n
* cms
* cms forms components
* vite
* prettier
* editorconfig
* icons: [Bootstrap icons](https://icons.getbootstrap.com/)

## Database subscribers

```svelte
<script>
  import CollectionSubscriber from '$lib/database'
  import Layout from '$lib/components/Layout'
  import { Query } from 'appwrite'

  const collection = new Collection('[database-id]', '[collection-id]')
  const [subscriber, loading] = collection.createSubscriber([Query.limit(5)])
  // listen changes (update, delete) in database and automatically rerender on change
  // current data = [{ name: 'John', lastName: 'Doe' }, ...]

  const insertSubscriber = collection.createObserver()
  // listen changes (create) in database and automatically rerender on change

  const [paginator, paginatorInitalLoading] = collection.createPaginator(10, [/* ...queries */])
  // paginate the collection of documents with limit
  // paginator.next() makes the next request for items
</script>

<Layout>
  {#if $loading}
    <p>Loading...</p>
  {:else}
    {#each [...$subscriber, ...$insertSubscriber] as item}
      <p>{item.name}</p>
    {/each}
  {/if}
</Layout>
```

## Routing

```svelte
<script>
  import { Router, Route, ProtectedRoute, Redirect, navigate, link, back, forward } from '$lib/router'
  import Home from './routes/home.svelte'
  import Profile from './routes/profile.svelte'
  import { isLoading, user, logout } from '$lib/auth'
</script>

<main>
  {#if !$isLoading}
    <Router>
      <Route path="/" component={Home}>
      <ProtectedRoute path="/profile" allow={$user?.status} fallback="/" component={Profile}>

      <a href="/about" use:link>About us</a>
    </Router>
  {/if}
</main>
```

## Social auth

```svelte
<script>
  import Layout from '$lib/components/Layout'
  import { account, url } from '$lib/stores/appwrite'
</script>

<Layout>
  <button on:click={() => account.createOAuth2Session('github', url.oauth.success, url.oauth.failure)}>
    Github
  </button>
</Layout>
```

## i18n

Locale file `src/locales/en.json`

```json
{
  "page": {
    "home": {
      "title": "Appwrite svelte rocket start 🚀"
    }
  }
}
```

```svelte
<script>
  import Layout from '$lib/components/Layout'
  import { _, locale, locales } from 'svelte-i18n'
</script>

<Layout>
  <h1>{$_('page.home.title')}</h1>

  <div>
    <p>Change language:</p>

    <select bind:value={$locale}>
      {#each $locales as locale}
        <option value={locale}>{locale}</option>
      {/each}
    </select>
  </div>
</Layout>
```

## path aliases

`$lib` = `src/lib`

`$root` = `/`

`$src` = `src`

`$cms` = `cms`

## commands

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run appwrite
```
