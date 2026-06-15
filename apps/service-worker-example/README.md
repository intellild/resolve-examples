# Service Worker Code URL Example

This app captures the service worker case where `navigator.serviceWorker.register()` needs the URL of a JavaScript entry. The current example uses the worker URL pipeline as a code-entry hack:

```ts
import serviceWorkerUrl from './app.service-worker.ts?worker&url';

await navigator.serviceWorker.register(serviceWorkerUrl, { type: 'module' });
```

The desired future shape is a first-class resolve primitive:

```ts
const serviceWorkerUrl = import.meta.resolve('./app.service-worker.ts');
await navigator.serviceWorker.register(serviceWorkerUrl, { type: 'module' });
```

The important distinction is that the service worker is code with its own execution context, not an asset file.

## Related Issues

- [vitejs/vite#7163](https://github.com/vitejs/vite/issues/7163) - Feature request to support service worker entry handling.
- [webpack/webpack#17253](https://github.com/webpack/webpack/issues/17253) - Service worker script referenced through `new URL(..., import.meta.url)` has preload/runtime integration gaps.
- [vitejs/vite#14500](https://github.com/vitejs/vite/issues/14500) - Feature request to bundle modules referenced by `import.meta.resolve()`.
- [webpack/webpack#16693](https://github.com/webpack/webpack/issues/16693) - Feature request to support `import.meta.resolve`.
