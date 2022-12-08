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
* files upload, download
* folder structure
* common components
* service worker
* path aliases
* database realtime subscribers
* database paginate, infinity scroll
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
  import { Collection } from '$lib/database'
  import { Query } from 'appwrite'

  const collection = new Collection('[database-id]', '[collection-id]')
  const [subscriber, loading] = collection.createSubscriber([Query.limit(5) /*, ...queries */])
  // listen changes (update, delete) in database and automatically rerender on change
  // current data = [{ name: 'John', lastName: 'Doe' }, ...]

  const insertSubscriber = collection.createObserver()
  // listen changes (create) in database and automatically rerender on change

  const [paginator, paginatorInitalLoading] = collection.createPaginate(10, [/* ...queries */])
  // paginate the collection of documents with limit and automatically rerender on change
  // paginator.next() makes the next request for items, paginator store automatically rerender on next load

  const [scrollData, scrollDispatch] = collection.createInfinityScrollDispatcher(10, [/* ...queries */], { /* intersection observer options */ })
  // load next data after scroll to anchor (scrollDispatch) element
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

<!-- scroll dispatcher example -->
<div>
  {#each $scrollData as item}
    <p>{item.name}</p>
  {/each}
  <div use:scrollDispatch on:fetch={(e) => console.log(e) /* on every fetch from scroll dispatcher do some action */} />
</div>
```

## Files subscribers

```svelte
<script>
  import { Bucket } from '$lib/storage'
  import { Query } from 'appwrite'

  const bucket = new Bucket('[bucket-id]')
  const [files, loading] = bucket.createSubscriber([Query.limit(5) /*, ...queries */])
  // listen changes (update, delete) in files and automatically rerender on change

  const insertSubscriber = bucket.createObserver()
  // listen changes (create) in files and automatically rerender on change

  const [upload, dispatch] = storage.createUploadDispatcher(/* many files ? true : false, default = false */)

  const [content, loading] = storage.getFileContent('6391f7c70ede82115575')
  // get file content and automatically rerender on file update
</script>

<div>
  <input type="file" use:upload />
  <button on:click={() => dispatch().then(uploadedFile => console.log(uploadedFile))}>Upload</button> 
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

### Routes structure

`__layout.svelte` the default layout for every page

`__error.svelte` the error page (404 error)

`__routes.svelte` the file includes all routes in application

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

`$routes` = `src/routes`

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
