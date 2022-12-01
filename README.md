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
    // current data = { name: 'John', lastName: 'Doe' }
  </script>

  <Layout>
    {$subscriber ? $subscriber[0].name : ''}
  </Layout>
```
