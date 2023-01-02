# Svelte + Appwrite = 🚀

## Appwrite svelte template

Blazing fast development with done backend and fully-prepared frontend.

CMS ready!

## Appwrite installation

[Appwrite installation](https://appwrite.io/docs/installation)

## Start

### Appwrite cli

```bash
npm install -g appwrite-cli
```

### Appwrite new project

```bash
appwrite init project
```

### Appwrite new collection

```bash
appwrite init collection
```

### Appwrite new function

```bash
appwrite init function
```

[Appwrite cli documentation](https://appwrite.io/docs/command-line)

## env

Edit `.env` file for config project id.

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
* icons: [Feather icons](https://feathericons.com/)

## Database subscribers

```svelte
<script>
  import { Collection } from '$lib/appwrite'
  import { Query } from 'appwrite'

  const collection = new Collection('[database-id]', '[collection-id]')
  const [subscriber, loading] = collection.listDocuments(/* filters?: string[], offset?: number, limit?: number, orderType?: "ASC" | "DESC" */)
  // listen changes (update, delete) in database and automatically rerender on change
  // current data = [{ name: 'John', lastName: 'Doe' }, ...]

  const [documentSubscriber, documentLoading] = collection.getDocument('[document-id]')
  const [documentSubscriber, documentLoading] = collection.getDocument([Query.equal('name', 'John'), /*...*/])
  // must be unique in collection, else throw error

  const insertSubscriber = collection.listenInsert((item) => item.name !== 'John')
  // listen changes (create/instert) in database and automatically rerender on change
  // can be created with filter function

  collection.createDocument({ name: 'John', lastname: 'Doe' }, [/* ...permissions */])
  // creates a document in collection with data and permissions

  collection.deleteDocument('[document-id]')
  collection.deleteDocument($documentSubscriber)
  // delete a document from collection by id or by the document

  collection.updateDocument('[document-id]', { name: 'John', lastname: 'Doe' }, [/* ...permissions */])
  collection.updateDocument($documentSubscriber, { name: 'John', lastname: 'Doe' }, [/* ...permissions */])
  // update a document from collection by id or by the document

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
  import { Bucket } from '$lib/appwrite'
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

Routes can be added in `__routes.svelte` file. Every route is fetched lazyly.

```svelte
<script lang="ts">
  import Router from '$lib/router/Router.svelte'

  import Layout from '$src/__layout.svelte'
  import Loading from '$src/__loading.svelte'
  import Error from '$src/__error.svelte'
</script>

<Router
  layout={Layout}
  loading={Loading}
  error={Error}
  routes={[
    {
      path: '/',
      component: () => import('$routes/index.svelte'),
    },
    {
      path: '/oauth',
      component: () => import('$routes/oauth/index.svelte'),
    },
    {
      path: '/oauth/failure',
      component: () => import('$routes/oauth/failure.svelte'),
    },
    {
      path: '/oauth/success',
      component: () => import('$routes/oauth/success.svelte'),
    },
  ]}
/>
```

### Routes structure

`__layout.svelte` the default layout for every page

`__error.svelte` the error page (404 error)

`__loading.svelte` the default loading component

`__routes.svelte` the file includes all routes in application

## auth/user

```svelte
<script>
  import { user } from '$lib/appwrite'
</script>

<div>
  {#if $user}
    user: {$user.name}
    <button on:click={() => user.destroySession('current')}>Logout</button>
  {:else}
      <button on:click={() => user.createEmailSession('[email]', '[password]')}>Login</button>
  {/if}
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
