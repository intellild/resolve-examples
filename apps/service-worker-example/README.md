# Service Worker Code URL Example

This app captures the service worker case where `navigator.serviceWorker.register()` needs the URL of a JavaScript entry. The example assumes bundlers treat `new URL('./app.service-worker.ts', import.meta.url)` as a generated code entry:

```ts
const serviceWorkerUrl = new URL('./app.service-worker.ts', import.meta.url);

await navigator.serviceWorker.register(serviceWorkerUrl, { type: 'module' });
```

The desired ESM output shape preserves the `new URL` expression while rewriting the referenced module to the emitted service worker chunk:

```ts
const serviceWorkerUrl = new URL(
  './app.service-worker.output-chunk.js',
  import.meta.url,
);
await navigator.serviceWorker.register(serviceWorkerUrl, { type: 'module' });
```

CJS output keeps the current runtime path behavior. The important distinction is that the service worker is code with its own execution context, not an asset file.

## Related Issues

- [vitejs/vite#7163](https://github.com/vitejs/vite/issues/7163) - Feature request to support service worker entry handling.
- [webpack/webpack#17253](https://github.com/webpack/webpack/issues/17253) - Service worker script referenced through `new URL(..., import.meta.url)` has preload/runtime integration gaps.
- [vitejs/vite#14500](https://github.com/vitejs/vite/issues/14500) - Feature request to bundle modules referenced by a code-entry resolver.
- [webpack/webpack#16693](https://github.com/webpack/webpack/issues/16693) - Feature request to support a code-entry resolver primitive.
