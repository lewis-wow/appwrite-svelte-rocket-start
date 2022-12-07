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
  import { Query } from 'appwrite'

  const collection = new Collection('[database-id]', '[collection-id]')
  const [subscriber, loading] = collection.createSubscriber([Query.limit(5)])
  // listen changes (update, delete) in database and automatically rerender on change
  // current data = [{ name: 'John', lastName: 'Doe' }, ...]

  const insertSubscriber = collection.createObserver()
  // listen changes (create) in database and automatically rerender on change

  const [paginator, paginatorInitalLoading] = collection.createPaginate(10, [/* ...queries */])
  // paginate the collection of documents with limit and automatically rerender on change
  // paginator.next() makes the next request for items, paginator store automatically rerender on next load
</script>

<div>
  {#if $loading}
    <p>Loading data from database...</p>
  {:else}
    {#each [...$subscriber, ...$insertSubscriber] as item}
      <p>{item.name}</p>
    {/each}
  {/if}
</div>
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
  import { account, url } from '$lib/stores/appwrite'
</script>

<div>
  <button on:click={() => account.createOAuth2Session('github', url.oauth.success, url.oauth.failure)}>
    Github
  </button>
</div>
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
  import { _, locale, locales } from 'svelte-i18n'
</script>

<div>
  <h1>{$_('page.home.title')}</h1>

  <div>
    <p>Change language:</p>

    <select bind:value={$locale}>
      {#each $locales as locale}
        <option value={locale}>{locale}</option>
      {/each}
    </select>
  </div>
</div>
```

## path aliases

`$lib` = `src/lib`

`$root` = `/`

`$src` = `src`

`$cms` = `cms`

`$routes` = `routes`

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
