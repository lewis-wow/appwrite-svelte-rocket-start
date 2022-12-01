# Svelte + Appwrite = 🚀

Blazing fast development with done backend and fully-prepared frontend.

Frontend included:

* tailwind
* scss
* typescript
* routing
* ready routes
* oauth
* folder structure
* common components
* simple icons
* service worker
* path aliases
* database realtime subscribers
* vite

Included:

* prettier
* editorconfig

## Database subscribers

```svelte
  <script>
    import { createCollectionSubscriber } from '$lib/database'
    import Layout from '$lib/components/Layout'

    const subscriber = createCollectionSubscriber('[database-id]', '[collection-id]')
    // listen changes in database and automatically rerender on change
    // current data = [{ name: 'John', lastName: 'Doe' }, ...]
  </script>

  <Layout>
    {$subscriber ? $subscriber[0].name : ''}
  </Layout>
```

```svelte
  <script>
    import { createDocumentSubscriber } from '$lib/database'
    import Layout from '$lib/components/Layout'

    const subscriber = createDocumentSubscriber('[database-id]', '[collection-id]', '[document-id]')
    // listen changes in database and automatically rerender on change
    // current data = { name: 'John', lastName: 'Doe' }
  </script>

  <Layout>
    {$subscriber?.name ?? ''}
  </Layout>
```

## Routing

```svelte
  <script>
    import { Router, Route, ProtectedRoute, Redirect, navigate, link, back, forward } from '$lib/router'
    import Home from './routes/home.svelte'
    import Profile from './routes/profile.svelte'
    import { account } from '$lib/stores/appwrite'
    import oauth from '$lib/stores/oauth'

    const user = oauth(account)
  </script>

  <main>
    <Router>
      <Route path="/" component={Home}>
      <ProtectedRoute path="/profile" allow={$user?.status} fallback="/" component={Profile}>

      <a href="/about" use:link>About us</a>
    </Router>
  </main>
```

## Social auth icons

```svelte
  <script>
    import { Github } from '@icons-pack/svelte-simple-icons'
    import Layout from '$lib/components/Layout'
    import { account, url } from '$lib/stores/appwrite'
  </script>

  <Layout>
    <button on:click={() => account.createOAuth2Session('github', url.oauth.success, url.oauth.failure)}>
      <Github />
    </button>
  </Layout>
```
